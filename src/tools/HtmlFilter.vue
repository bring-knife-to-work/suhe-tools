<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { filterHtml } from '../utils/formatters'

const input = ref('<style>.a{color:red}</style>' + '<script>alert(1)<\/script>' + '<p>内容</p>')
const output = ref('')
const opts = ref({ tags: true, scripts: true, styles: true })

function filter() {
  output.value = filterHtml(input.value, opts.value)
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" title="HTML 代码过滤">
    <template #actions>
      <label class="wt-check"><input v-model="opts.tags" type="checkbox" /> 移除标签</label>
      <label class="wt-check"><input v-model="opts.scripts" type="checkbox" /> 移除脚本</label>
      <label class="wt-check"><input v-model="opts.styles" type="checkbox" /> 移除样式</label>
      <button class="wt-btn" @click="filter">过滤</button>
    </template>
  </WtToolPanel>
</template>
