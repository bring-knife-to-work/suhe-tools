<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { jsonToCsv } from '../utils/converters'

const input = ref('[{"name":"Tom","age":20},{"name":"Jerry","age":18}]')
const output = ref('')
const error = ref('')

function convert() {
  error.value = ''
  try { output.value = jsonToCsv(input.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="JSON 转 CSV">
    <template #actions><button class="wt-btn" @click="convert">转换</button></template>
  </WtToolPanel>
</template>
