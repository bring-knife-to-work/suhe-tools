<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getToolById } from '../../data/tools'
import WtToolPanel from '../../components/WtToolPanel.vue'
import * as E from '../../utils/encodeUtils'

const route = useRoute()
const tool = computed(() => getToolById(route.params.id))
const input = ref('')
const output = ref('')
const error = ref('')
const mode = ref('encode')
const shaAlgo = ref('SHA-256')
const pwdLen = ref(16)

async function run() {
  error.value = ''
  try {
    const t = tool.value?.type
    const text = input.value
    const enc = mode.value === 'encode'
    if (t === 'base64-encode') output.value = enc ? E.base64Encode(text) : E.base64Decode(text)
    else if (t === 'base64-batch') output.value = text.split('\n').map(l => enc ? E.base64Encode(l) : E.base64Decode(l)).join('\n')
    else if (t === 'url-encode') output.value = E.urlEncode(text, !enc)
    else if (t === 'html-entity') output.value = E.htmlEntity(text, !enc)
    else if (t === 'utf8-encode') output.value = E.utf8Escape(text, !enc)
    else if (t === 'escape-encode') output.value = enc ? E.jsEscape(text) : text
    else if (t === 'jwt-decode') output.value = E.jwtDecode(text)
    else if (t === 'md5' || t === 'md5-batch') output.value = t === 'md5-batch' ? text.split('\n').map(E.md5).join('\n') : E.md5(text)
    else if (t === 'sha-hash') output.value = await E.shaHash(text, shaAlgo.value)
    else if (t === 'morse') output.value = enc ? E.morseEncode(text) : E.morseDecode(text)
    else if (t === 'base32') output.value = enc ? E.base32Encode(text) : '解码请使用编码工具'
    else if (t === 'text-binary') output.value = enc ? E.textToBinary(text) : E.binaryToText(text)
    else if (t === 'text-hex') output.value = enc ? E.textToHex(text) : E.hexToText(text)
    else if (t === 'random-password') output.value = E.randomPassword(pwdLen.value)
    else if (t === 'password-entropy') output.value = E.passwordEntropy(text)
    else if (t === 'js-obfuscate') output.value = E.jsObfuscate(text)
    else if (t === 'url-hex') output.value = enc ? text.split('').map(c => c.charCodeAt(0).toString(16)).join('') : text.match(/.{2}/g)?.map(h => String.fromCharCode(parseInt(h,16))).join('') || ''
    else if (t === 'image-to-base64' || t === 'file-to-base64') output.value = '请上传文件'
    else if (t === 'base64-to-image') {
      output.value = text.startsWith('data:') ? text : `data:image/png;base64,${text}`
    }
    else output.value = '功能开发中，请稍后'
  } catch (e) { error.value = e.message }
}

function onFile(e) {
  const f = e.target.files?.[0]
  if (!f) return
  const r = new FileReader()
  r.onload = () => { input.value = r.result.split(',')[1] || r.result; run() }
  if (tool.value?.type === 'file-md5') {
    r.onload = async () => {
      const buf = await f.arrayBuffer()
      const hash = await crypto.subtle.digest('SHA-256', buf)
      output.value = [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,'0')).join('')
    }
    r.readAsArrayBuffer(f)
  } else r.readAsDataURL(f)
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" :title="tool?.name" :single="['image-to-base64','base64-to-image','file-to-base64','file-md5'].includes(tool?.type)">
    <template #actions>
      <template v-if="!['jwt-decode','md5','sha-hash','random-password','password-entropy','file-md5'].includes(tool?.type)">
        <button class="wt-btn wt-btn--ghost" :class="{ 'wt-btn--active': mode === 'encode' }" @click="mode = 'encode'">编码</button>
        <button class="wt-btn wt-btn--ghost" :class="{ 'wt-btn--active': mode === 'decode' }" @click="mode = 'decode'">解码</button>
      </template>
      <select v-if="tool?.type === 'sha-hash'" v-model="shaAlgo" class="wt-select">
        <option value="SHA-1">SHA-1</option>
        <option value="SHA-256">SHA-256</option>
        <option value="SHA-384">SHA-384</option>
        <option value="SHA-512">SHA-512</option>
      </select>
      <button class="wt-btn" @click="run">转换</button>
    </template>
    <template #extra>
      <div v-if="['image-to-base64','file-to-base64','file-md5'].includes(tool?.type)" class="wt-upload">
        <input type="file" @change="onFile" />
      </div>
      <img v-if="tool?.type === 'base64-to-image' && output.startsWith('data:')" :src="output" style="max-width:300px;margin-top:12px" />
      <label v-if="tool?.type === 'random-password'" class="wt-field"><span>长度</span><input v-model.number="pwdLen" type="number" class="wt-input" min="4" max="64" /></label>
    </template>
  </WtToolPanel>
</template>
