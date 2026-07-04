<script setup>
import { ref } from 'vue'
import { copyText } from '../composables/useToast'

const loaders = [
  { name: '旋转圆环', css: `.wt-loader-spin {\n  width: 40px; height: 40px;\n  border: 3px solid #e5e7eb;\n  border-top-color: #6366f1;\n  border-radius: 50%;\n  animation: wt-spin 0.8s linear infinite;\n}\n@keyframes wt-spin { to { transform: rotate(360deg); } }`, html: '<div class="wt-loader-spin"></div>' },
  { name: '脉冲圆点', css: `.wt-loader-dots {\n  display: flex; gap: 6px;\n}\n.wt-loader-dots span {\n  width: 10px; height: 10px;\n  background: #6366f1;\n  border-radius: 50%;\n  animation: wt-bounce 1.2s ease-in-out infinite;\n}\n.wt-loader-dots span:nth-child(2) { animation-delay: 0.2s; }\n.wt-loader-dots span:nth-child(3) { animation-delay: 0.4s; }\n@keyframes wt-bounce {\n  0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }\n  40% { transform: scale(1); opacity: 1; }\n}`, html: '<div class="wt-loader-dots"><span></span><span></span><span></span></div>' },
  { name: '进度条', css: `.wt-loader-bar {\n  width: 200px; height: 4px;\n  background: #e5e7eb;\n  border-radius: 2px;\n  overflow: hidden;\n}\n.wt-loader-bar::after {\n  content: '';\n  display: block;\n  width: 40%;\n  height: 100%;\n  background: #6366f1;\n  border-radius: 2px;\n  animation: wt-bar 1.5s ease-in-out infinite;\n}\n@keyframes wt-bar {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(350%); }\n}`, html: '<div class="wt-loader-bar"></div>' },
  { name: '骨架闪烁', css: `.wt-loader-skeleton {\n  width: 200px; height: 20px;\n  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);\n  background-size: 200% 100%;\n  border-radius: 4px;\n  animation: wt-shimmer 1.5s infinite;\n}\n@keyframes wt-shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}`, html: '<div class="wt-loader-skeleton"></div>' },
  { name: '双环旋转', css: `.wt-loader-dual {\n  width: 40px; height: 40px;\n  border: 3px solid transparent;\n  border-top-color: #6366f1;\n  border-bottom-color: #8b5cf6;\n  border-radius: 50%;\n  animation: wt-spin 1s linear infinite;\n}`, html: '<div class="wt-loader-dual"></div>' },
]

const active = ref(0)

function copy(css) {
  copyText(css, 'CSS 已复制')
}
</script>

<template>
  <div class="wt-tool-panel">
    <h2 class="wt-tool-panel__title">CSS 加载动画</h2>
    <div class="wt-loader-tabs">
      <button
        v-for="(l, i) in loaders"
        :key="i"
        class="wt-btn wt-btn--ghost"
        :class="{ 'wt-btn--active': active === i }"
        @click="active = i"
      >{{ l.name }}</button>
    </div>
    <div class="wt-loader-preview">
      <div class="wt-loader-demo" v-html="loaders[active].html" />
    </div>
    <div class="wt-tool-panel__header">
      <span class="wt-label">CSS 代码</span>
      <button class="wt-btn wt-btn--ghost" @click="copy(loaders[active].css)">复制</button>
    </div>
    <textarea class="wt-textarea wt-textarea--output" :value="loaders[active].css" readonly />
  </div>
</template>

<style>
.wt-loader-spin, .wt-loader-dual { width: 40px; height: 40px; border: 3px solid #e5e7eb; border-top-color: #6366f1; border-radius: 50%; animation: wt-spin 0.8s linear infinite; }
.wt-loader-dual { border-bottom-color: #8b5cf6; animation-duration: 1s; }
.wt-loader-dots { display: flex; gap: 6px; }
.wt-loader-dots span { width: 10px; height: 10px; background: #6366f1; border-radius: 50%; animation: wt-bounce 1.2s ease-in-out infinite; }
.wt-loader-dots span:nth-child(2) { animation-delay: 0.2s; }
.wt-loader-dots span:nth-child(3) { animation-delay: 0.4s; }
.wt-loader-bar { width: 200px; height: 4px; background: #e5e7eb; border-radius: 2px; overflow: hidden; }
.wt-loader-bar::after { content: ''; display: block; width: 40%; height: 100%; background: #6366f1; border-radius: 2px; animation: wt-bar 1.5s ease-in-out infinite; }
.wt-loader-skeleton { width: 200px; height: 20px; background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%); background-size: 200% 100%; border-radius: 4px; animation: wt-shimmer 1.5s infinite; }
@keyframes wt-spin { to { transform: rotate(360deg); } }
@keyframes wt-bounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }
@keyframes wt-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
@keyframes wt-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
</style>
