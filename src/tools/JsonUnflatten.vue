<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { unflattenJson } from '../utils/formatters'

const input = ref('{"user.name":"Tom","user.addr.city":"Beijing"}')
const output = ref('')
const error = ref('')

function unflatten() {
  error.value = ''
  try { output.value = JSON.stringify(unflattenJson(JSON.parse(input.value)), null, 2) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="JSON 反扁平化">
    <template #actions><button class="wt-btn" @click="unflatten">反扁平化</button></template>
  </WtToolPanel>
</template>
