<script setup>
import { ref } from 'vue'
import { copyText } from '../composables/useToast'

const balance = ref('1,234.56')
const showBalance = ref(true)
const previewRef = ref(null)

async function exportImage() {
  try {
    const el = previewRef.value
    const canvas = document.createElement('canvas')
    const scale = 2
    canvas.width = 320 * scale
    canvas.height = 580 * scale
    const ctx = canvas.getContext('2d')
    ctx.scale(scale, scale)
    ctx.fillStyle = '#ededed'
    ctx.fillRect(0, 0, 320, 580)
    ctx.fillStyle = '#07c160'
    ctx.fillRect(0, 0, 320, 200)
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText('零钱', 140, 50)
    ctx.font = '12px sans-serif'
    ctx.fillText(showBalance.value ? `¥ ${balance.value}` : '****', 120, 120)
    ctx.fillStyle = '#333'
    ctx.fillText('零钱明细', 20, 260)
    ctx.fillText('充值', 20, 300)
    ctx.fillText('提现', 20, 340)
    const a = document.createElement('a')
    a.download = 'wechat-wallet.png'
    a.href = canvas.toDataURL('image/png')
    a.click()
  } catch {
    copyText('导出失败，请使用系统截图', '提示')
  }
}
</script>

<template>
  <div class="wt-tool-panel">
    <h2 class="wt-tool-panel__title">微信零钱模拟器</h2>
    <div class="wt-form-grid">
      <label class="wt-field"><span>余额</span><input v-model="balance" class="wt-input" /></label>
      <label class="wt-check"><input v-model="showBalance" type="checkbox" /> 显示余额</label>
    </div>
    <div ref="previewRef" class="wt-wallet-preview">
      <div class="wt-wallet-preview__header">零钱</div>
      <div class="wt-wallet-preview__balance">{{ showBalance ? `¥ ${balance}` : '****' }}</div>
      <div class="wt-wallet-preview__menu">
        <div>零钱明细</div>
        <div>充值</div>
        <div>提现</div>
      </div>
    </div>
    <button class="wt-btn" @click="exportImage">导出截图</button>
  </div>
</template>

<style scoped>
.wt-wallet-preview { width: 320px; height: 400px; background: #ededed; border-radius: 16px; overflow: hidden; margin: 16px 0; border: 6px solid #1a1a1a; }
.wt-wallet-preview__header { background: #07c160; color: #fff; text-align: center; padding: 40px 0 60px; font-weight: 600; font-size: 16px; }
.wt-wallet-preview__balance { text-align: center; font-size: 32px; font-weight: 700; margin-top: -30px; color: #333; }
.wt-wallet-preview__menu { margin-top: 60px; }
.wt-wallet-preview__menu div { padding: 16px 20px; border-bottom: 1px solid #e0e0e0; background: #fff; }
</style>
