<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { formatHtml, minifyHtml } from '../utils/formatters'

const input = ref('<div class="box"><p>Hello</p><span>World</span></div>')
const output = ref('')
const error = ref('')

function run(fn) {
  error.value = ''
  try { output.value = fn(input.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="HTML 处理">
    <template #actions>
      <button class="wt-btn" @click="run(formatHtml)">美化</button>
      <button class="wt-btn wt-btn--ghost" @click="run(minifyHtml)">压缩</button>
    </template>
  </WtToolPanel>
</template>
