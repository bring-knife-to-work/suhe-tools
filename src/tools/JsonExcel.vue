<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { jsonToExcel } from '../utils/converters'

const input = ref('[{"姓名":"张三","年龄":25},{"姓名":"李四","年龄":30}]')
const error = ref('')

function download() {
  error.value = ''
  try {
    const data = jsonToExcel(input.value)
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.xlsx'
    a.click()
    URL.revokeObjectURL(url)
  } catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" output="点击下载按钮生成 Excel 文件" :error="error" title="JSON 转 Excel">
    <template #actions><button class="wt-btn" @click="download">下载 Excel</button></template>
  </WtToolPanel>
</template>
