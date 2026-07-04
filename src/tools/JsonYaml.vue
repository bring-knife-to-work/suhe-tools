<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { jsonToYaml } from '../utils/converters'

const input = ref('{"name":"wt","items":[1,2,3]}')
const output = ref('')
const error = ref('')

function convert() {
  error.value = ''
  try { output.value = jsonToYaml(input.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="JSON 转 YAML">
    <template #actions><button class="wt-btn" @click="convert">转换</button></template>
  </WtToolPanel>
</template>
