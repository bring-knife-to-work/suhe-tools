<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import WtIcon from '../components/WtIcon.vue'
import { serialize, unserialize } from 'php-serialize'

const input = ref('{"name":"Tom","age":20}')
const output = ref('')
const mode = ref('toPhp')
const error = ref('')

function convert() {
  error.value = ''
  try {
    if (mode.value === 'toPhp') {
      output.value = serialize(JSON.parse(input.value))
    } else {
      output.value = JSON.stringify(unserialize(input.value), null, 2)
    }
  } catch (e) { error.value = e.message }
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" title="PHP 序列化">
    <template #actions>
      <button class="wt-btn" :class="{ 'wt-btn--active': mode === 'toPhp' }" @click="mode = 'toPhp'">
        JSON <WtIcon name="arrow-right" :size="12" /> PHP
      </button>
      <button class="wt-btn wt-btn--ghost" :class="{ 'wt-btn--active': mode === 'toJson' }" @click="mode = 'toJson'">
        PHP <WtIcon name="arrow-right" :size="12" /> JSON
      </button>
      <button class="wt-btn" @click="convert">转换</button>
    </template>
  </WtToolPanel>
</template>
