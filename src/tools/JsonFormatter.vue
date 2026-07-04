<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { formatJson, minifyJson } from '../utils/formatters'

const input = ref('{"name":"wt-tools","version":1}')
const output = ref('')
const error = ref('')

function run(fn) {
  error.value = ''
  try { output.value = fn(input.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="JSON 处理">
    <template #actions>
      <button class="wt-btn" @click="run(formatJson)">格式化</button>
      <button class="wt-btn wt-btn--ghost" @click="run(minifyJson)">压缩</button>
    </template>
  </WtToolPanel>
</template>
