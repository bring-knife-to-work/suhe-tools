<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getToolById } from '../../data/tools'
import WtToolPanel from '../../components/WtToolPanel.vue'
import * as E from '../../utils/encodeUtils'

const route = useRoute()
const tool = computed(() => getToolById(route.params.id))
const input = ref('')
const output = ref('')
const error = ref('')
const ip = ref('加载中...')
const metaTitle = ref('素盒工具箱')
const metaDesc = ref('高效在线工具集合')
const ratioA = ref(16)
const ratioB = ref(9)

const HTTP_STATUS = {
  200: 'OK - 成功', 301: 'Moved Permanently - 永久重定向', 302: 'Found - 临时重定向',
  400: 'Bad Request - 请求错误', 401: 'Unauthorized - 未授权', 403: 'Forbidden - 禁止访问',
  404: 'Not Found - 未找到', 500: 'Internal Server Error - 服务器错误', 502: 'Bad Gateway', 503: 'Service Unavailable',
}

const UA_LIST = `Chrome: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36
iPhone: Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148
Android: Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36
iPad: Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15`

onMounted(async () => {
  if (tool.value?.type === 'my-ip') {
    try {
      const r = await fetch('https://api.ipify.org?format=json')
      const d = await r.json()
      ip.value = d.ip
    } catch { ip.value = '获取失败（网络问题）' }
  }
})

function run() {
  error.value = ''
  try {
    const t = tool.value?.type
    if (t === 'browser-info') {
      output.value = JSON.stringify({
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screen: `${screen.width}x${screen.height}`,
        viewport: `${innerWidth}x${innerHeight}`,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
      }, null, 2)
    } else if (t === 'url-parser') {
      const u = new URL(input.value.startsWith('http') ? input.value : 'https://' + input.value)
      output.value = JSON.stringify({ protocol: u.protocol, host: u.host, pathname: u.pathname, search: u.search, hash: u.hash }, null, 2)
    } else if (t === 'user-agent-list') output.value = UA_LIST
    else if (t === 'http-status') output.value = HTTP_STATUS[+input.value] || '未知状态码'
    else if (t === 'meta-generator') {
      output.value = `<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${metaTitle.value}</title>\n<meta name="description" content="${metaDesc.value}">\n<meta name="keywords" content="工具,在线">\n<meta property="og:title" content="${metaTitle.value}">\n<meta property="og:description" content="${metaDesc.value}">`
    } else if (t === 'robots-generator') {
      output.value = `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${input.value || 'https://example.com/sitemap.xml'}`
    } else if (t === 'ip-int-convert') {
      output.value = input.value.includes('.') ? String(E.ipToInt(input.value)) : E.intToIp(+input.value)
    } else if (t === 'random-ip') {
      output.value = Array.from({ length: 5 }, () => `${Math.floor(Math.random()*223)+1}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`).join('\n')
    } else if (t === 'ratio-calculator') {
      const r = ratioA.value / ratioB.value
      output.value = `比例 ${ratioA.value}:${ratioB.value}\n比值: ${r.toFixed(4)}\n若宽=${input.value || 1920}，高=${Math.round((input.value || 1920) / r)}`
    } else if (t === 'web-shortcut') {
      const url = input.value.startsWith('http') ? input.value : 'https://' + input.value
      output.value = `[InternetShortcut]\nURL=${url}`
    } else if (t === 'favicon-fetch') {
      const host = input.value.replace(/^https?:\/\//, '').split('/')[0]
      output.value = `https://${host}/favicon.ico`
    } else if (t === 'sitemap-extract') {
      const urls = [...input.value.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])
      output.value = urls.join('\n') || '未找到 URL'
    } else if (t === 'robots-check' || t === 'view-source' || t === 'keyword-density' || t === 'meta-check' || t === 'http-headers') {
      output.value = '该功能需要服务端代理抓取网页，浏览器端受 CORS 限制。请直接访问目标 URL 或使用浏览器开发者工具。'
    } else if (t === 'baidu-push') {
      output.value = '百度推送需配置站点 token，在百度搜索资源平台获取 API 推送接口。'
    } else if (t === 'regex-generator') {
      output.value = `邮箱: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\n手机: 1[3-9]\\d{9}\nURL: https?:\\/\\/[^\\s]+\n中文: [\\u4e00-\\u9fff]+`
    } else if (t === 'log-analyzer') {
      const lines = input.value.split('\n')
      const bots = lines.filter(l => /bot|spider|crawl/i.test(l)).length
      output.value = `总行数: ${lines.length}\n疑似蜘蛛: ${bots}`
    } else output.value = '功能说明已显示，部分工具需网络 API 支持'
  } catch (e) { error.value = e.message }
}
</script>

<template>
  <div class="wt-tool-panel">
    <h2 class="wt-tool-panel__title">{{ tool?.name }}</h2>
    <template v-if="tool?.type === 'my-ip'">
      <div class="wt-result-box">您的公网 IP: <strong>{{ ip }}</strong></div>
    </template>
    <WtToolPanel v-else v-model:input="input" :output="output" :error="error" :show-copy="!!output">
      <template #actions><button class="wt-btn" @click="run">查询</button></template>
      <template v-if="tool?.type === 'meta-generator'" #extra>
        <div class="wt-form-grid">
          <label class="wt-field"><span>标题</span><input v-model="metaTitle" class="wt-input" /></label>
          <label class="wt-field"><span>描述</span><input v-model="metaDesc" class="wt-input" /></label>
        </div>
      </template>
    </WtToolPanel>
  </div>
</template>
