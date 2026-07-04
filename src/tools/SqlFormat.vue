<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { formatSql, minifySql } from '../utils/formatters'

const input = ref('SELECT id,name,email FROM users WHERE status=1 ORDER BY created_at DESC LIMIT 10')
const output = ref('')
const error = ref('')

function run(fn) {
  error.value = ''
  try { output.value = fn(input.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="SQL 处理">
    <template #actions>
      <button class="wt-btn" @click="run(formatSql)">格式化</button>
      <button class="wt-btn wt-btn--ghost" @click="run(minifySql)">压缩</button>
    </template>
  </WtToolPanel>
</template>
