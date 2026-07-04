<script setup>
import { ref, computed } from 'vue'
import WtToolPanel from '../components/WtToolPanel.vue'

const form = ref({
  name: '素盒工具箱',
  short_name: '素盒',
  description: '简约在线工具箱',
  start_url: '/',
  display: 'standalone',
  background_color: '#f4f6f9',
  theme_color: '#6366f1',
  icons: [{ src: '/favicon.svg', sizes: '192x192', type: 'image/svg+xml' }],
})

const output = computed(() => JSON.stringify({
  name: form.value.name,
  short_name: form.value.short_name,
  description: form.value.description,
  start_url: form.value.start_url,
  display: form.value.display,
  background_color: form.value.background_color,
  theme_color: form.value.theme_color,
  icons: form.value.icons,
}, null, 2))

function download() {
  const blob = new Blob([output.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'manifest.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="wt-tool-panel">
    <div class="wt-tool-panel__header">
      <h2 class="wt-tool-panel__title">PWA Manifest 配置</h2>
      <button class="wt-btn" @click="download">下载 manifest.json</button>
    </div>
    <div class="wt-form-grid">
      <label class="wt-field"><span>应用名称</span><input v-model="form.name" class="wt-input" /></label>
      <label class="wt-field"><span>短名称</span><input v-model="form.short_name" class="wt-input" /></label>
      <label class="wt-field"><span>描述</span><input v-model="form.description" class="wt-input" /></label>
      <label class="wt-field"><span>起始 URL</span><input v-model="form.start_url" class="wt-input" /></label>
      <label class="wt-field"><span>显示模式</span>
        <select v-model="form.display" class="wt-select">
          <option value="standalone">standalone</option>
          <option value="fullscreen">fullscreen</option>
          <option value="minimal-ui">minimal-ui</option>
          <option value="browser">browser</option>
        </select>
      </label>
      <label class="wt-field"><span>背景色</span><input v-model="form.background_color" type="color" class="wt-input wt-input--color" /></label>
      <label class="wt-field"><span>主题色</span><input v-model="form.theme_color" type="color" class="wt-input wt-input--color" /></label>
    </div>
    <textarea class="wt-textarea wt-textarea--output" :value="output" readonly />
  </div>
</template>
