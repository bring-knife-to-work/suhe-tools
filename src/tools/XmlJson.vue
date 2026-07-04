<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { xmlToJson } from '../utils/converters'

const input = ref('<root><name>wt</name><version>1</version></root>')
const output = ref('')
const error = ref('')

function convert() {
  error.value = ''
  try { output.value = xmlToJson(input.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="XML 转 JSON">
    <template #actions><button class="wt-btn" @click="convert">转换</button></template>
  </WtToolPanel>
</template>
