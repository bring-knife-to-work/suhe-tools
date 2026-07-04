<script setup>
import { ref } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'
import { toCamelCase, toSnakeCase, toPascalCase, toKebabCase } from '../utils/formatters'

const input = ref('user_name_list')
const output = ref('')
const mode = ref('camel')

const modes = {
  camel: { label: '驼峰 camelCase', fn: toCamelCase },
  pascal: { label: '帕斯卡 PascalCase', fn: toPascalCase },
  snake: { label: '下划线 snake_case', fn: toSnakeCase },
  kebab: { label: '短横线 kebab-case', fn: toKebabCase },
}

function convert() {
  output.value = modes[mode.value].fn(input.value)
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" title="命名格式转换">
    <template #actions>
      <select v-model="mode" class="wt-select" @change="convert">
        <option v-for="(m, k) in modes" :key="k" :value="k">{{ m.label }}</option>
      </select>
      <button class="wt-btn" @click="convert">转换</button>
    </template>
  </WtToolPanel>
</template>
