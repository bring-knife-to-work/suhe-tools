<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getToolById } from '../../data/tools'
import { UNIT_GROUPS, convertUnit, numberToRmbUpper, calcBloodType, remToPx, pxToRem, CURRENCY_RATES, SHOE_SIZE } from '../../utils/units'
import WtIcon from '../../components/WtIcon.vue'

const route = useRoute()
const tool = computed(() => getToolById(route.params.id))

const value = ref(1)
const fromUnit = ref('')
const toUnit = ref('')
const result = ref('')
const error = ref('')

const group = computed(() => tool.value?.unitGroup ? UNIT_GROUPS[tool.value.unitGroup] : null)
const units = computed(() => group.value?.units || [])

watch([tool, units], () => {
  if (units.value.length >= 2) {
    fromUnit.value = units.value[0].id
    toUnit.value = units.value[1].id
  }
  convert()
}, { immediate: true })

function convert() {
  error.value = ''
  try {
    if (!tool.value) return
    const t = tool.value.type
    if (t === 'unit') {
      result.value = String(convertUnit(value.value, fromUnit.value, toUnit.value, tool.value.unitGroup))
    } else if (t === 'rmb-upper') {
      result.value = numberToRmbUpper(Number(value.value))
    } else if (t === 'rem-px') {
      const base = remBase.value
      result.value = remMode.value === 'toPx'
        ? `${remToPx(Number(value.value), base)} px`
        : `${pxToRem(Number(value.value), base)} rem`
    } else if (t === 'currency') {
      const cny = Number(value.value) / CURRENCY_RATES[fromCurrency.value]
      result.value = String(cny * CURRENCY_RATES[toCurrency.value])
    }
  } catch (e) { error.value = e.message; result.value = '' }
}

function swap() {
  ;[fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value]
  convert()
}

// rem-px
const remMode = ref('toPx')
const remBase = ref(16)

// currency
const fromCurrency = ref('CNY')
const toCurrency = ref('USD')
const currencies = Object.keys(CURRENCY_RATES)

// blood type
const fatherBlood = ref('A')
const motherBlood = ref('B')
const bloodResult = computed(() => calcBloodType(fatherBlood.value, motherBlood.value).join('、'))

// shoe size
const shoeGender = ref('male')
const shoeFrom = ref('cn')
const shoeIndex = ref(0)
const shoeSizes = computed(() => SHOE_SIZE[shoeGender.value])
const shoeResult = computed(() => {
  const s = shoeSizes.value
  const i = shoeIndex.value
  return `中国: ${s.cn[i]} | 美国: ${s.us[i]} | 欧洲: ${s.eu[i]} | 英国: ${s.uk[i]}`
})

watch([fromCurrency, toCurrency, remMode, remBase], convert)

function convertAll(unitId) {
  try { return convertUnit(value.value, fromUnit.value, unitId, tool.value.unitGroup) }
  catch { return '-' }
}
</script>

<template>
  <div class="wt-tool-panel">
    <div v-if="error" class="wt-tool-panel__error">{{ error }}</div>

    <!-- 通用单位转换 -->
    <template v-if="tool?.type === 'unit' && group">
      <div class="wt-converter">
        <input v-model.number="value" type="number" class="wt-input wt-input--lg" @input="convert" />
        <select v-model="fromUnit" class="wt-select" @change="convert">
          <option v-for="u in units" :key="u.id" :value="u.id">{{ u.name }}</option>
        </select>
        <button class="wt-btn wt-btn--ghost wt-btn--icon" title="交换单位" @click="swap">
          <WtIcon name="arrow-swap" :size="16" />
        </button>
        <input :value="result" class="wt-input wt-input--lg" readonly />
        <select v-model="toUnit" class="wt-select" @change="convert">
          <option v-for="u in units" :key="u.id" :value="u.id">{{ u.name }}</option>
        </select>
      </div>
      <div class="wt-converter-all">
        <div v-for="u in units" :key="u.id" class="wt-info-item">
          <span class="wt-info-item__label">{{ u.name }}</span>
          <span class="wt-info-item__value">{{ convertAll(u.id) }}</span>
        </div>
      </div>
    </template>

    <!-- 人民币大写 -->
    <template v-else-if="tool?.type === 'rmb-upper'">
      <label class="wt-field"><span>金额（元）</span><input v-model.number="value" type="number" class="wt-input" @input="convert" /></label>
      <div class="wt-result-box">{{ result }}</div>
    </template>

    <!-- REM/PX -->
    <template v-else-if="tool?.type === 'rem-px'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>方向</span>
          <div class="wt-toggle-group">
            <button class="wt-btn wt-btn--ghost" :class="{ 'wt-btn--active': remMode === 'toPx' }" @click="remMode = 'toPx'; convert()">
              rem <WtIcon name="arrow-right" :size="12" /> px
            </button>
            <button class="wt-btn wt-btn--ghost" :class="{ 'wt-btn--active': remMode === 'toRem' }" @click="remMode = 'toRem'; convert()">
              px <WtIcon name="arrow-right" :size="12" /> rem
            </button>
          </div>
        </label>
        <label class="wt-field"><span>根字号(base)</span><input v-model.number="remBase" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>输入值</span><input v-model.number="value" type="number" class="wt-input" @input="convert" /></label>
      </div>
      <div class="wt-result-box">{{ result }}</div>
    </template>

    <!-- 货币 -->
    <template v-else-if="tool?.type === 'currency'">
      <div class="wt-converter">
        <input v-model.number="value" type="number" class="wt-input wt-input--lg" @input="convert" />
        <select v-model="fromCurrency" class="wt-select" @change="convert">
          <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
        </select>
        <span>=</span>
        <input :value="result" class="wt-input wt-input--lg" readonly />
        <select v-model="toCurrency" class="wt-select" @change="convert">
          <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <p class="wt-hint">汇率为参考值，非实时汇率</p>
    </template>

    <!-- 血型 -->
    <template v-else-if="tool?.type === 'blood-type'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>父亲血型</span>
          <select v-model="fatherBlood" class="wt-select"><option v-for="b in ['A','B','AB','O']" :key="b" :value="b">{{ b }}</option></select>
        </label>
        <label class="wt-field"><span>母亲血型</span>
          <select v-model="motherBlood" class="wt-select"><option v-for="b in ['A','B','AB','O']" :key="b" :value="b">{{ b }}</option></select>
        </label>
      </div>
      <div class="wt-result-box">子女可能血型：{{ bloodResult }}</div>
    </template>

    <!-- 鞋码 -->
    <template v-else-if="tool?.type === 'shoe-size'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>性别</span>
          <select v-model="shoeGender" class="wt-select"><option value="male">男</option><option value="female">女</option></select>
        </label>
        <label class="wt-field"><span>中国码</span>
          <select v-model.number="shoeIndex" class="wt-select">
            <option v-for="(s, i) in shoeSizes.cn" :key="i" :value="i">{{ s }}</option>
          </select>
        </label>
      </div>
      <div class="wt-result-box">{{ shoeResult }}</div>
    </template>
  </div>
</template>

<style scoped>
.wt-converter { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.wt-input--lg { width: 140px; padding: 10px 14px; font-size: 16px; }
.wt-converter-all { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px; }
.wt-result-box { padding: 16px 20px; background: var(--wt-primary-light); border-radius: var(--wt-radius); font-size: 18px; font-weight: 600; color: var(--wt-primary); margin-top: 12px; }
</style>
