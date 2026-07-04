<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { excelToJson } from '../utils/converters'

const input = ref('')
const output = ref('')
const error = ref('')

async function onFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  error.value = ''
  try { output.value = await excelToJson(file) }
  catch (err) { error.value = err.message }
}
</script>

<template>
  <div class="wt-tool-panel">
    <div class="wt-tool-panel__header">
      <h2 class="wt-tool-panel__title">Excel 转 JSON</h2>
    </div>
    <div v-if="error" class="wt-tool-panel__error">{{ error }}</div>
    <div class="wt-upload">
      <input type="file" accept=".xlsx,.xls" @change="onFile" />
      <p class="wt-hint">支持 .xlsx / .xls 文件</p>
    </div>
    <textarea class="wt-textarea wt-textarea--output" :value="output" readonly placeholder="转换结果..." />
  </div>
</template>
