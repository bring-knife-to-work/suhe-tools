<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import JSZip from 'jszip'
import * as XLSX from 'xlsx'
import { getToolById } from '../../data/tools'

const route = useRoute()
const tool = computed(() => getToolById(route.params.id))
const error = ref('')
const pdfUrl = ref('')
const vcfName = ref('张三')
const vcfPhone = ref('13800138000')
const vcfEmail = ref('test@example.com')

async function packZip(e) {
  const files = [...e.target.files]
  if (!files.length) return
  error.value = ''
  try {
    const zip = new JSZip()
    files.forEach(f => zip.file(f.name, f))
    const blob = await zip.generateAsync({ type: 'blob' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'archive.zip'
    a.click()
  } catch (err) { error.value = err.message }
}

async function unpackZip(e) {
  const f = e.target.files?.[0]
  if (!f) return
  error.value = ''
  try {
    const zip = await JSZip.loadAsync(f)
    const zipOut = new JSZip()
    for (const name of Object.keys(zip.files)) {
      if (!zip.files[name].dir) zipOut.file(name, await zip.files[name].async('blob'))
    }
    const blob = await zipOut.generateAsync({ type: 'blob' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'extracted.zip'
    a.click()
  } catch (err) { error.value = err.message }
}

function imagesToPdf(e) {
  const files = [...e.target.files]
  if (!files.length) return
  error.value = ''
  const win = window.open('', '_blank')
  win.document.write('<html><head><title>PDF Print</title><style>img{max-width:100%;page-break-after:always;display:block;margin:0 auto}</style></head><body></body></html>')
  const body = win.document.body
  let loaded = 0
  files.forEach(f => {
    const img = new Image()
    img.onload = () => { body.appendChild(img); if (++loaded === files.length) setTimeout(() => win.print(), 500) }
    img.src = URL.createObjectURL(f)
  })
}

function onPdf(e) {
  const f = e.target.files?.[0]
  if (f) pdfUrl.value = URL.createObjectURL(f)
}

function csvToExcel(e) {
  const f = e.target.files?.[0]
  if (!f) return
  const r = new FileReader()
  r.onload = () => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(r.result.split('\n').map(l => l.split(',')))
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, 'converted.xlsx')
  }
  r.readAsText(f)
}

function excelToCsv(e) {
  const f = e.target.files?.[0]
  if (!f) return
  const r = new FileReader()
  r.onload = () => {
    const wb = XLSX.read(r.result, { type: 'array' })
    const csv = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]])
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = 'converted.csv'
    a.click()
  }
  r.readAsArrayBuffer(f)
}

function downloadVcf() {
  const vcf = `BEGIN:VCARD\nVERSION:3.0\nFN:${vcfName.value}\nTEL:${vcfPhone.value}\nEMAIL:${vcfEmail.value}\nEND:VCARD`
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([vcf], { type: 'text/vcard' }))
  a.download = 'contact.vcf'
  a.click()
}
</script>

<template>
  <div class="wt-tool-panel">
    <h2 class="wt-tool-panel__title">{{ tool?.name }}</h2>
    <p class="wt-tool-panel__desc">{{ tool?.desc }}</p>
    <div v-if="error" class="wt-tool-panel__error">{{ error }}</div>

    <template v-if="tool?.type === 'zip-pack'">
      <div class="wt-upload"><input type="file" multiple @change="packZip" /><p class="wt-hint">选择多个文件打包为 ZIP</p></div>
    </template>
    <template v-else-if="tool?.type === 'zip-unpack'">
      <div class="wt-upload"><input type="file" accept=".zip" @change="unpackZip" /><p class="wt-hint">上传 ZIP 文件解压</p></div>
    </template>
    <template v-else-if="tool?.type === 'images-to-pdf'">
      <div class="wt-upload"><input type="file" accept="image/*" multiple @change="imagesToPdf" /><p class="wt-hint">选择图片后通过打印保存为 PDF</p></div>
    </template>
    <template v-else-if="tool?.type === 'pdf-reader'">
      <div class="wt-upload"><input type="file" accept=".pdf" @change="onPdf" /></div>
      <iframe v-if="pdfUrl" :src="pdfUrl" class="wt-pdf-frame" />
    </template>
    <template v-else-if="tool?.type === 'csv-to-excel'">
      <div class="wt-upload"><input type="file" accept=".csv" @change="csvToExcel" /></div>
    </template>
    <template v-else-if="tool?.type === 'excel-to-csv'">
      <div class="wt-upload"><input type="file" accept=".xlsx,.xls" @change="excelToCsv" /></div>
    </template>
    <template v-else-if="tool?.type === 'vcf-generator'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>姓名</span><input v-model="vcfName" class="wt-input" /></label>
        <label class="wt-field"><span>电话</span><input v-model="vcfPhone" class="wt-input" /></label>
        <label class="wt-field"><span>邮箱</span><input v-model="vcfEmail" class="wt-input" /></label>
      </div>
      <button class="wt-btn" @click="downloadVcf">下载 VCF</button>
    </template>
    <template v-else-if="tool?.type === 'pdf-stub'">
      <div class="wt-stub">
        <p>该 PDF 工具需要引入 pdf-lib 库，当前为占位入口。</p>
        <p>可使用「PDF 在线阅读器」浏览 PDF，或使用「图片转 PDF」将图片打印为 PDF。</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.wt-pdf-frame { width: 100%; height: 70vh; border: 1px solid var(--wt-border); border-radius: 8px; margin-top: 16px; }
.wt-stub { padding: 24px; background: var(--wt-bg); border-radius: 8px; color: var(--wt-text-muted); line-height: 1.8; }
</style>
