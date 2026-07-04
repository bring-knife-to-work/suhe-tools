<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { escapeHtml, unescapeHtml } from '../utils/formatters'

const input = ref('<div class="test">Hello & "World"</div>')
const output = ref('')
const mode = ref('escape')

function convert() {
  output.value = mode.value === 'escape' ? escapeHtml(input.value) : unescapeHtml(input.value)
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" title="HTML 字符转义">
    <template #actions>
      <button class="wt-btn" :class="{ 'wt-btn--active': mode === 'escape' }" @click="mode = 'escape'; convert()">转义</button>
      <button class="wt-btn wt-btn--ghost" :class="{ 'wt-btn--active': mode === 'unescape' }" @click="mode = 'unescape'; convert()">反转义</button>
    </template>
  </WtToolPanel>
</template>
