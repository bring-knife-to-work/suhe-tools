<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { extractImages } from '../utils/formatters'

const input = ref('<img src="https://a.com/1.png"><img src="https://b.com/2.jpg"><img src="https://a.com/1.png">')
const output = ref('')

function extract() {
  output.value = extractImages(input.value).join('\n')
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" title="HTML 图片链接提取">
    <template #actions>
      <button class="wt-btn" @click="extract">提取</button>
    </template>
  </WtToolPanel>
</template>
