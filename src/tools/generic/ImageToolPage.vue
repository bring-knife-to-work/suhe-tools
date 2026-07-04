<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getToolById } from '../../data/tools'
import { loadImage, processors, downloadCanvas } from '../../utils/imageProcessors'
import QRCode from 'qrcode'
import JsBarcode from 'jsbarcode'
import jsQR from 'jsqr'
import heic2any from 'heic2any'

const route = useRoute()
const tool = computed(() => getToolById(route.params.id))
const preview = ref('')
const result = ref('')
const error = ref('')
const amount = ref(100)
const angle = ref(0)
const flipDir = ref('h')
const wmText = ref('素盒工具箱')
const qrText = ref('https://wt-tools.local')
const barcodeText = ref('123456789012')
const placeholderW = ref(400)
const placeholderH = ref(300)
const filterIdx = ref(0)
const format = ref('png')
const gridResults = ref([])

const FILTER_NAMES = ['原图', '灰度', '复古', '高对比', '明亮', '饱和', '色相', '反色']

async function onFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  error.value = ''
  try {
    let img
    if (file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic') {
      const blob = await heic2any({ blob: file, toType: 'image/jpeg' })
      img = await loadImage(new File([blob], 'converted.jpg', { type: 'image/jpeg' }))
    } else {
      img = await loadImage(file)
    }
    preview.value = URL.createObjectURL(file)
    await process(img)
  } catch (err) { error.value = err.message }
}

async function process(img) {
  const proc = tool.value?.processor
  if (!proc) return

  if (proc === 'qrcodeGen') {
    result.value = await QRCode.toDataURL(qrText.value, { width: 256 })
    return
  }
  if (proc === 'barcode') {
    const c = document.createElement('canvas')
    JsBarcode(c, barcodeText.value, { format: 'CODE128', width: 2, height: 80, displayValue: true })
    result.value = c.toDataURL()
    return
  }
  if (proc === 'vcardQrcode') {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${qrText.value}\nEND:VCARD`
    result.value = await QRCode.toDataURL(vcard, { width: 256 })
    return
  }
  if (proc === 'placeholder') {
    const c = processors.placeholder({ width: placeholderW.value, height: placeholderH.value, text: qrText.value })
    result.value = c.toDataURL()
    return
  }
  if (proc === 'qrcodeDecode') {
    const c = canvasFromImg(img)
    const ctx = c.getContext('2d')
    const imageData = ctx.getImageData(0, 0, c.width, c.height)
    const code = jsQR(imageData.data, c.width, c.height)
    result.value = code ? code.data : '未识别到二维码'
    return
  }
  if (proc === 'colorPicker') {
    const c = canvasFromImg(img)
    const d = c.getContext('2d').getImageData(0, 0, 1, 1).data
    result.value = `RGB(${d[0]}, ${d[1]}, ${d[2]}) HEX:#${[d[0],d[1],d[2]].map(x=>x.toString(16).padStart(2,'0')).join('')}`
    return
  }
  if (proc === 'nineGrid') {
    gridResults.value = processors.nineGrid(img).map(c => c.toDataURL())
    result.value = '已生成9张切片'
    return
  }
  if (proc === 'format') {
    const c = canvasFromImg(img)
    const mime = format.value === 'jpg' ? 'image/jpeg' : format.value === 'webp' ? 'image/webp' : 'image/png'
    result.value = c.toDataURL(mime, 0.9)
    return
  }
  if (proc === 'heic') {
    result.value = preview.value
    return
  }

  const fn = processors[proc]
  if (!fn) { result.value = '该图片功能正在完善中，基础编辑请使用已有处理器'; return }
  const opts = { amount: amount.value, angle: angle.value, direction: flipDir.value, text: wmText.value, filterIdx: filterIdx.value, quality: amount.value / 100, scale: amount.value }
  const c = fn(img, opts)
  if (Array.isArray(c)) return
  result.value = c.toDataURL('image/png')
}

function canvasFromImg(img) {
  const c = document.createElement('canvas')
  c.width = img.width; c.height = img.height
  c.getContext('2d').drawImage(img, 0, 0)
  return c
}

function download() {
  if (!result.value) return
  const link = document.createElement('a')
  link.download = `wt-${tool.value?.id || 'image'}.png`
  link.href = result.value
  link.click()
}

async function genWithoutUpload() {
  if (tool.value?.processor === 'qrcodeGen') { result.value = await QRCode.toDataURL(qrText.value, { width: 256 }) }
  else if (tool.value?.processor === 'barcode') {
    const c = document.createElement('canvas')
    JsBarcode(c, barcodeText.value, { format: 'CODE128', width: 2, height: 80, displayValue: true })
    result.value = c.toDataURL()
  }
  else if (tool.value?.processor === 'placeholder') {
    const c = processors.placeholder({ width: placeholderW.value, height: placeholderH.value, text: qrText.value })
    result.value = c.toDataURL()
  }
}
</script>

<template>
  <div class="wt-tool-panel">
    <div v-if="error" class="wt-tool-panel__error">{{ error }}</div>

    <div v-if="['qrcodeGen','barcode','vcardQrcode','placeholder'].includes(tool?.processor)" class="wt-form-grid">
      <label v-if="tool?.processor !== 'barcode'" class="wt-field"><span>内容</span><input v-model="qrText" class="wt-input" /></label>
      <label v-if="tool?.processor === 'barcode'" class="wt-field"><span>条码内容</span><input v-model="barcodeText" class="wt-input" /></label>
      <template v-if="tool?.processor === 'placeholder'">
        <label class="wt-field"><span>宽度</span><input v-model.number="placeholderW" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>高度</span><input v-model.number="placeholderH" type="number" class="wt-input" /></label>
      </template>
      <button class="wt-btn" @click="genWithoutUpload">生成</button>
    </div>

    <div v-else class="wt-upload">
      <input type="file" accept="image/*,.heic" @change="onFile" />
      <p class="wt-hint">支持 JPG、PNG、WebP、HEIC 等格式</p>
    </div>

    <div v-if="!['qrcodeGen','barcode','placeholder'].includes(tool?.processor)" class="wt-form-grid">
      <label v-if="['resize','compress','brightness','saturation','warmth','blur'].includes(tool?.processor)" class="wt-field">
        <span>强度/比例 ({{ amount }})</span>
        <input v-model.number="amount" type="range" min="10" max="200" @input="() => {}" />
      </label>
      <label v-if="tool?.processor === 'rotate'" class="wt-field">
        <span>角度 ({{ angle }}°)</span>
        <input v-model.number="angle" type="range" min="0" max="360" />
      </label>
      <label v-if="tool?.processor === 'flip'" class="wt-field">
        <span>方向</span>
        <select v-model="flipDir" class="wt-select"><option value="h">水平</option><option value="v">垂直</option></select>
      </label>
      <label v-if="tool?.processor === 'watermark'" class="wt-field">
        <span>水印文字</span><input v-model="wmText" class="wt-input" />
      </label>
      <label v-if="tool?.processor === 'filter'" class="wt-field">
        <span>滤镜</span>
        <select v-model="filterIdx" class="wt-select">
          <option v-for="(f, i) in FILTER_NAMES" :key="i" :value="i">{{ f }}</option>
        </select>
      </label>
      <label v-if="tool?.processor === 'format'" class="wt-field">
        <span>输出格式</span>
        <select v-model="format" class="wt-select"><option value="png">PNG</option><option value="jpg">JPG</option><option value="webp">WebP</option></select>
      </label>
    </div>

    <div class="wt-img-preview-row">
      <div v-if="preview" class="wt-img-box"><img :src="preview" alt="原图" /></div>
      <div v-if="result" class="wt-img-box"><img :src="result" alt="结果" /></div>
    </div>
    <div v-if="gridResults.length" class="wt-grid-preview">
      <img v-for="(g, i) in gridResults" :key="i" :src="g" />
    </div>
    <p v-if="typeof result === 'string' && !result.startsWith('data:')" class="wt-output">{{ result }}</p>
    <button v-if="result && result.startsWith('data:')" class="wt-btn" @click="download">下载图片</button>
  </div>
</template>

<style scoped>
.wt-img-preview-row { display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0; }
.wt-img-box { flex: 1; min-width: 200px; border: 1px solid var(--wt-border); border-radius: 8px; overflow: hidden; }
.wt-img-box img { width: 100%; display: block; }
.wt-grid-preview { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; max-width: 300px; }
.wt-grid-preview img { width: 100%; }
.wt-output { padding: 12px; background: #f8fafc; border-radius: 8px; margin-top: 12px; word-break: break-all; }
</style>
