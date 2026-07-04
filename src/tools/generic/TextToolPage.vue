<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getToolById } from '../../data/tools'
import WtToolPanel from '../../components/WtToolPanel.vue'
import * as T from '../../utils/textUtils'

const route = useRoute()
const tool = computed(() => getToolById(route.params.id))
const input = ref('')
const output = ref('')
const error = ref('')
const find = ref('')
const replace = ref('')
const splitSep = ref(',')
const seqStart = ref(1)
const seqEnd = ref(10)
const seqStep = ref(1)
const zhMode = ref('t')
const caseMode = ref('upper')

function run() {
  error.value = ''
  try {
    const t = tool.value?.type
    const text = input.value
    if (t === 'word-count') output.value = T.wordCount(text)
    else if (t === 'zh-convert') output.value = T.zhConvert(text, zhMode.value)
    else if (t === 'pinyin') output.value = T.toPinyin(text)
    else if (t === 'case-convert') output.value = T.caseConvert(text, caseMode.value)
    else if (t === 'circle-letter') output.value = T.circleLetter(text)
    else if (t === 'martian-text') output.value = T.martianText(text)
    else if (t === 'text-replace') output.value = text.split(find.value).join(replace.value)
    else if (t === 'newline-to-text') output.value = text.replace(/\\n/g, '\n')
    else if (t === 'text-to-newline') output.value = text.replace(/\n/g, '\\n')
    else if (t === 'emoji-remove') output.value = T.removeEmoji(text)
    else if (t === 'random-string-gen') output.value = Array.from({ length: 10 }, () => Math.random().toString(36).slice(2, 10)).join('\n')
    else if (t === 'number-sum') output.value = T.numberSum(text)
    else if (t === 'phone-extract') output.value = T.extractPhones(text)
    else if (t === 'email-extract') output.value = T.extractEmails(text)
    else if (t === 'url-extractor') output.value = T.extractUrls(text)
    else if (t === 'text-split') output.value = text.split(splitSep.value).join('\n')
    else if (t === 'line-frequency') output.value = T.lineFrequency(text)
    else if (t === 'number-sequence') {
      const arr = []
      for (let i = seqStart.value; i <= seqEnd.value; i += seqStep.value) arr.push(i)
      output.value = arr.join('\n')
    }
    else if (t === 'notepad') { localStorage.setItem('wt-notepad', text); output.value = '已自动保存' }
    else if (t === 'markdown-editor') output.value = T.simpleMarkdown(text)
    else if (t === 'text-extractor') output.value = `手机:\n${T.extractPhones(text)}\n\n邮箱:\n${T.extractEmails(text)}\n\nURL:\n${T.extractUrls(text)}`
    else if (t === 'idcard-birthday') output.value = T.idcardBirthday(text.trim())
    else if (t === 'forbidden-words') output.value = T.forbiddenWords(text, tool.value?.platform)
    else if (t === 'wechat-chat-template') { input.value = T.CHAT_TEMPLATES; output.value = '已加载模板' }
    else if (t === 'text-auto-format') output.value = T.autoFormat(text)
    else if (t === 'text-file-reader') output.value = '请使用文件上传'
    else output.value = '功能处理中'
  } catch (e) { error.value = e.message }
}

watch(() => route.params.id, () => {
  if (tool.value?.type === 'notepad') input.value = localStorage.getItem('wt-notepad') || ''
  output.value = ''
}, { immediate: true })

function onFileRead(e) {
  const f = e.target.files?.[0]
  if (!f) return
  const r = new FileReader()
  r.onload = () => { input.value = r.result; run() }
  r.readAsText(f)
}
</script>

<template>
  <WtToolPanel v-model:input="input" :output="output" :error="error" :title="tool?.name" @update:input="run">
    <template #actions>
      <template v-if="tool?.type === 'zh-convert'">
        <button class="wt-btn wt-btn--ghost" :class="{ 'wt-btn--active': zhMode === 't' }" @click="zhMode = 't'; run()">简转繁</button>
        <button class="wt-btn wt-btn--ghost" :class="{ 'wt-btn--active': zhMode === 's' }" @click="zhMode = 's'; run()">繁转简</button>
      </template>
      <template v-if="tool?.type === 'case-convert'">
        <button class="wt-btn wt-btn--ghost" @click="caseMode = 'upper'; run()">大写</button>
        <button class="wt-btn wt-btn--ghost" @click="caseMode = 'lower'; run()">小写</button>
      </template>
      <button class="wt-btn" @click="run">处理</button>
    </template>
    <template v-if="tool?.type === 'text-replace'" #extra>
      <div class="wt-form-grid">
        <label class="wt-field"><span>查找</span><input v-model="find" class="wt-input" /></label>
        <label class="wt-field"><span>替换为</span><input v-model="replace" class="wt-input" /></label>
      </div>
    </template>
    <template v-if="tool?.type === 'text-split'" #extra>
      <label class="wt-field"><span>分隔符</span><input v-model="splitSep" class="wt-input" /></label>
    </template>
    <template v-if="tool?.type === 'number-sequence'" #extra>
      <div class="wt-form-grid">
        <label class="wt-field"><span>起始</span><input v-model.number="seqStart" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>结束</span><input v-model.number="seqEnd" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>步长</span><input v-model.number="seqStep" type="number" class="wt-input" /></label>
      </div>
    </template>
    <template v-if="tool?.type === 'text-file-reader'" #extra>
      <input type="file" accept=".txt,.md,.json,.csv,.log" @change="onFileRead" />
    </template>
    <template v-if="tool?.type === 'markdown-editor'" #extra>
      <div class="wt-md-preview" v-html="output" />
    </template>
  </WtToolPanel>
</template>

<style scoped>
.wt-md-preview { padding: 16px; background: #fff; border: 1px solid var(--wt-border); border-radius: 8px; margin-top: 12px; line-height: 1.7; }
</style>
