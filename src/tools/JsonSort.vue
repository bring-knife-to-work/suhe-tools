<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { sortJsonKeys } from '../utils/formatters'

const input = ref('{"z":1,"a":{"c":3,"b":2}}')
const output = ref('')
const error = ref('')

function sort() {
  error.value = ''
  try { output.value = JSON.stringify(sortJsonKeys(JSON.parse(input.value)), null, 2) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="JSON 键名排序">
    <template #actions><button class="wt-btn" @click="sort">排序</button></template>
  </WtToolPanel>
</template>
