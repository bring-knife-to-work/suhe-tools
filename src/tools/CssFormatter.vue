<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { formatCss, minifyCss } from '../utils/formatters'

const input = ref('.btn { color: #fff; background: #6366f1; padding: 8px 16px; border-radius: 6px; }')
const output = ref('')
const error = ref('')

function run(fn) {
  error.value = ''
  try { output.value = fn(input.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="CSS 处理">
    <template #actions>
      <button class="wt-btn" @click="run(formatCss)">格式化</button>
      <button class="wt-btn wt-btn--ghost" @click="run(minifyCss)">压缩</button>
    </template>
  </WtToolPanel>
</template>
