<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { yamlToJson } from '../utils/converters'

const input = ref('name: wt-tools\nversion: 1')
const output = ref('')
const error = ref('')

function convert() {
  error.value = ''
  try { output.value = yamlToJson(input.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="YAML 转 JSON">
    <template #actions><button class="wt-btn" @click="convert">转换</button></template>
  </WtToolPanel>
</template>
