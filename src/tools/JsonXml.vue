<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { jsonToXml } from '../utils/converters'

const input = ref('{"root":{"name":"wt","version":1}}')
const output = ref('')
const error = ref('')

function convert() {
  error.value = ''
  try { output.value = jsonToXml(input.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="JSON 转 XML">
    <template #actions><button class="wt-btn" @click="convert">转换</button></template>
  </WtToolPanel>
</template>
