<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { batchConvertTimestamps } from '../utils/converters'

const input = ref('1704067200\n1704153600\n1704240000')
const output = ref('')
const format = ref('YYYY-MM-DD HH:mm:ss')
const error = ref('')

function convert() {
  error.value = ''
  try { output.value = batchConvertTimestamps(input.value, format.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="时间戳批量转换" input-placeholder="每行一个时间戳">
    <template #actions>
      <input v-model="format" class="wt-input" placeholder="输出格式" />
      <button class="wt-btn" @click="convert">转换</button>
    </template>
  </WtToolPanel>
</template>
