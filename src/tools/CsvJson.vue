<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { csvToJson } from '../utils/converters'

const input = ref('name,age\nTom,20\nJerry,18')
const output = ref('')
const error = ref('')

function convert() {
  error.value = ''
  try { output.value = csvToJson(input.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="CSV 转 JSON">
    <template #actions><button class="wt-btn" @click="convert">转换</button></template>
  </WtToolPanel>
</template>
