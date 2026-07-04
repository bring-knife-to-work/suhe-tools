<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { flattenJson } from '../utils/formatters'

const input = ref('{"user":{"name":"Tom","addr":{"city":"Beijing"}}}')
const output = ref('')
const error = ref('')

function flatten() {
  error.value = ''
  try { output.value = JSON.stringify(flattenJson(JSON.parse(input.value)), null, 2) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="JSON 扁平化">
    <template #actions><button class="wt-btn" @click="flatten">扁平化</button></template>
  </WtToolPanel>
</template>
