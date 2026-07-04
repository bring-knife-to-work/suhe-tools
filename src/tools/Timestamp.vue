<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import WtIcon from '../components/WtIcon.vue'
import { formatTimestamp, dateToTimestamp } from '../utils/converters'

const input = ref('')
const output = ref('')
const error = ref('')
const mode = ref('toDate')
const unit = ref('s')
let timer

function convert() {
  error.value = ''
  output.value = ''
  try {
    if (mode.value === 'toDate') {
      output.value = formatTimestamp(input.value, unit.value)
    } else {
      const r = dateToTimestamp(input.value)
      output.value = unit.value === 'ms' ? String(r.milliseconds) : String(r.seconds)
    }
  } catch (e) { error.value = e.message }
}

function updateNow() {
  const now = Date.now()
  if (mode.value === 'toDate' && !input.value) {
    output.value = `当前时间戳(秒): ${Math.floor(now / 1000)}\n当前时间戳(毫秒): ${now}\n当前时间: ${new Date(now).toLocaleString('zh-CN')}`
  }
}

onMounted(() => { updateNow(); timer = setInterval(updateNow, 1000) })
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="Unix 时间戳转换" input-placeholder="输入时间戳或日期时间">
    <template #actions>
      <div class="wt-toggle-group">
        <button class="wt-btn wt-btn--ghost" :class="{ 'wt-btn--active': mode === 'toDate' }" @click="mode = 'toDate'; convert()">
          时间戳 <WtIcon name="arrow-right" :size="12" /> 日期
        </button>
        <button class="wt-btn wt-btn--ghost" :class="{ 'wt-btn--active': mode === 'toTs' }" @click="mode = 'toTs'; convert()">
          日期 <WtIcon name="arrow-right" :size="12" /> 时间戳
        </button>
      </div>
      <select v-model="unit" class="wt-select" @change="convert">
        <option value="s">秒</option>
        <option value="ms">毫秒</option>
      </select>
      <button class="wt-btn" @click="convert">转换</button>
    </template>
  </WtToolPanel>
</template>
