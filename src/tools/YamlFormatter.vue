<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { formatYaml } from '../utils/converters'

const input = ref('name: wt-tools\nversion: 1\nfeatures:\n  - json\n  - css')
const output = ref('')
const error = ref('')

function format() {
  error.value = ''
  try { output.value = formatYaml(input.value) }
  catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="YAML 格式化">
    <template #actions>
      <button class="wt-btn" @click="format">格式化</button>
    </template>
  </WtToolPanel>
</template>
