<script setup>
import { ref, watch } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { convertBase } from '../utils/converters'

const input = ref('255')
const output = ref('')
const fromBase = ref(10)
const error = ref('')

const bases = [
  { v: 2, label: '二进制' },
  { v: 8, label: '八进制' },
  { v: 10, label: '十进制' },
  { v: 16, label: '十六进制' },
]

function convert() {
  error.value = ''
  const results = []
  try {
    for (const b of bases) {
      if (b.v === fromBase.value) {
        results.push(`${b.label}: ${input.value}`)
      } else {
        results.push(`${b.label}: ${convertBase(input.value, fromBase.value, b.v)}`)
      }
    }
    output.value = results.join('\n')
  } catch (e) { error.value = e.message }
}

watch([input, fromBase], convert, { immediate: true })
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="进制转换" input-placeholder="输入数值">
    <template #actions>
      <select v-model="fromBase" class="wt-select">
        <option v-for="b in bases" :key="b.v" :value="b.v">从{{ b.label }}</option>
      </select>
    </template>
  </WtToolPanel>
</template>
