<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const info = ref({})

function collect() {
  info.value = {
    '屏幕宽度': screen.width,
    '屏幕高度': screen.height,
    '可用宽度': screen.availWidth,
    '可用高度': screen.availHeight,
    '色彩深度': screen.colorDepth + ' bit',
    '像素比': window.devicePixelRatio,
    '视口宽度': window.innerWidth,
    '视口高度': window.innerHeight,
    '文档宽度': document.documentElement.clientWidth,
    '文档高度': document.documentElement.clientHeight,
    '屏幕方向': screen.orientation?.type || '未知',
    '用户代理': navigator.userAgent,
    '语言': navigator.language,
    '在线状态': navigator.onLine ? '在线' : '离线',
    '触摸支持': 'ontouchstart' in window ? '是' : '否',
  }
}

let timer
onMounted(() => { collect(); timer = setInterval(collect, 1000) })
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="wt-tool-panel">
    <h2 class="wt-tool-panel__title">屏幕参数查看器</h2>
    <p class="wt-tool-panel__desc">实时采集屏幕与浏览器环境参数，每秒自动刷新</p>
    <div class="wt-info-grid">
      <div v-for="(val, key) in info" :key="key" class="wt-info-item">
        <span class="wt-info-item__label">{{ key }}</span>
        <span class="wt-info-item__value">{{ val }}</span>
      </div>
    </div>
  </div>
</template>
