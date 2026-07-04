<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { convertDateFormat } from '../utils/converters'
import WtIcon from '../components/WtIcon.vue'

const input = ref('2024-01-01 12:00:00')
const output = ref('')
const fromFmt = ref('YYYY-MM-DD HH:mm:ss')
const toFmt = ref('YYYY/MM/DD')
const error = ref('')

function convert() {
  error.value = ''
  try { output.value = convertDateFormat(input.value, fromFmt.value, toFmt.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="日期时间格式转换">
    <template #actions>
      <input v-model="fromFmt" class="wt-input" placeholder="输入格式" />
      <WtIcon name="arrow-right" :size="16" class="wt-arrow-inline" />
      <input v-model="toFmt" class="wt-input" placeholder="输出格式" />
      <button class="wt-btn" @click="convert">转换</button>
    </template>
    <template #extra>
      <p class="wt-hint">支持占位符: YYYY MM DD HH mm ss</p>
    </template>
  </WtToolPanel>
</template>
