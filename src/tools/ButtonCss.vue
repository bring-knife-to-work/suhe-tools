<script setup>
import { ref, computed } from 'vue'
import { copyText } from '../composables/useToast'

const style = ref({
  text: '按钮',
  bg: '#6366f1',
  color: '#ffffff',
  paddingX: 20,
  paddingY: 10,
  radius: 8,
  fontSize: 14,
  border: 'none',
  shadow: true,
})

const css = computed(() => {
  const s = style.value
  let code = `.wt-custom-btn {\n  display: inline-block;\n  background: ${s.bg};\n  color: ${s.color};\n  padding: ${s.paddingY}px ${s.paddingX}px;\n  font-size: ${s.fontSize}px;\n  border: ${s.border};\n  border-radius: ${s.radius}px;\n  cursor: pointer;\n  text-decoration: none;\n  transition: all 0.2s;`
  if (s.shadow) code += `\n  box-shadow: 0 2px 8px ${s.bg}66;`
  code += `\n}\n\n.wt-custom-btn:hover {\n  opacity: 0.9;\n  transform: translateY(-1px);\n}`
  return code
})

const btnStyle = computed(() => ({
  background: style.value.bg,
  color: style.value.color,
  padding: `${style.value.paddingY}px ${style.value.paddingX}px`,
  fontSize: `${style.value.fontSize}px`,
  border: style.value.border,
  borderRadius: `${style.value.radius}px`,
  boxShadow: style.value.shadow ? `0 2px 8px ${style.value.bg}66` : 'none',
}))

function copy() {
  copyText(css.value, 'CSS 已复制')
}
</script>

<template>
  <div class="wt-tool-panel">
    <div class="wt-tool-panel__header">
      <h2 class="wt-tool-panel__title">按钮 CSS 生成器</h2>
      <button class="wt-btn" @click="copy">复制 CSS</button>
    </div>
    <div class="wt-button-gen">
      <div class="wt-button-gen__preview">
        <button class="wt-custom-btn" :style="btnStyle">{{ style.text }}</button>
      </div>
      <div class="wt-form-grid">
        <label class="wt-field"><span>文字</span><input v-model="style.text" class="wt-input" /></label>
        <label class="wt-field"><span>背景色</span><input v-model="style.bg" type="color" class="wt-input wt-input--color" /></label>
        <label class="wt-field"><span>文字色</span><input v-model="style.color" type="color" class="wt-input wt-input--color" /></label>
        <label class="wt-field"><span>水平内边距</span><input v-model.number="style.paddingX" type="range" min="4" max="48" /></label>
        <label class="wt-field"><span>垂直内边距</span><input v-model.number="style.paddingY" type="range" min="4" max="32" /></label>
        <label class="wt-field"><span>圆角</span><input v-model.number="style.radius" type="range" min="0" max="32" /></label>
        <label class="wt-field"><span>字号</span><input v-model.number="style.fontSize" type="range" min="10" max="24" /></label>
        <label class="wt-check"><input v-model="style.shadow" type="checkbox" /> 阴影</label>
      </div>
      <textarea class="wt-textarea wt-textarea--output" :value="css" readonly />
    </div>
  </div>
</template>

<style scoped>
.wt-custom-btn { border: none; cursor: pointer; transition: all 0.2s; }
.wt-custom-btn:hover { opacity: 0.9; transform: translateY(-1px); }
</style>
