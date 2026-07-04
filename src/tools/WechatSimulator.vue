<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getToolById } from '../data/tools'
import { copyText } from '../composables/useToast'

const route = useRoute()
const tool = computed(() => getToolById(route.params.id))
const mode = computed(() => tool.value?.mode || 'chat')

const myName = ref('我')
const otherName = ref('好友')
const chatTitle = ref('好友')
const balance = ref('1,234.56')
const newMsg = ref('')
const newSender = ref('other')
const messages = ref([
  { sender: 'other', type: 'text', content: '在吗？', time: '14:30' },
  { sender: 'me', type: 'text', content: '在的，怎么了', time: '14:31' },
  { sender: 'other', type: 'text', content: '周末有空一起吃饭吗', time: '14:32' },
  { sender: 'me', type: 'text', content: '好啊，周六见！', time: '14:33' },
])

const momentText = ref('今天天气真好 ☀️')
const momentLikes = ref(12)
const momentComments = ref([{ name: '小明', text: '羡慕！' }, { name: '小红', text: '下次一起' }])

const previewRef = ref(null)

function addMessage() {
  if (!newMsg.value.trim()) return
  messages.value.push({
    sender: newSender.value,
    type: 'text',
    content: newMsg.value,
    time: new Date().toTimeString().slice(0, 5),
  })
  newMsg.value = ''
}

function addRedPacket() {
  messages.value.push({ sender: newSender.value, type: 'redpacket', content: '恭喜发财，大吉大利', time: new Date().toTimeString().slice(0, 5) })
}

function loadTemplate() {
  messages.value = [
    { sender: 'other', type: 'text', content: '老板，在吗', time: '09:00' },
    { sender: 'me', type: 'text', content: '在的', time: '09:01' },
    { sender: 'other', type: 'text', content: '那个项目进度怎么样了', time: '09:02' },
    { sender: 'me', type: 'text', content: '已经完成了80%，预计周五交付', time: '09:05' },
    { sender: 'other', type: 'text', content: '好的，辛苦了 👍', time: '09:06' },
  ]
}

async function exportImage() {
  await nextTick()
  const el = previewRef.value
  if (!el) return
  try {
    const canvas = document.createElement('canvas')
    const scale = 2
    const rect = el.getBoundingClientRect()
    canvas.width = rect.width * scale
    canvas.height = rect.height * scale
    const ctx = canvas.getContext('2d')
    ctx.scale(scale, scale)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}"><foreignObject width="100%" height="100%">${new XMLSerializer().serializeToString(el.cloneNode(true))}</foreignObject></svg>`
    const img = new Image()
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url })
    ctx.drawImage(img, 0, 0)
    const dataUrl = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.download = `wechat-${tool.value?.id || 'sim'}.png`
    a.href = dataUrl
    a.click()
  } catch {
    copyText('截图导出失败，请使用系统截图工具（Win+Shift+S）', '提示')
  }
}
</script>

<template>
  <div class="wt-tool-panel wt-wechat">
    <h2 class="wt-tool-panel__title">{{ tool?.name }}</h2>
    <p class="wt-hint">自定义对话内容，预览后导出聊天截图</p>

    <div class="wt-wechat__layout">
      <div class="wt-wechat__editor">
        <template v-if="mode === 'chat' || mode === 'pro' || mode === 'group'">
          <div class="wt-form-grid">
            <label class="wt-field"><span>对方昵称</span><input v-model="otherName" class="wt-input" /></label>
            <label class="wt-field"><span>我的昵称</span><input v-model="myName" class="wt-input" /></label>
            <label class="wt-field"><span>聊天标题</span><input v-model="chatTitle" class="wt-input" /></label>
          </div>
          <div class="wt-wechat__msg-list">
            <div v-for="(m, i) in messages" :key="i" class="wt-wechat__msg-item" :class="`wt-wechat__msg-item--${m.sender}`">
              <span class="wt-wechat__msg-badge">{{ m.sender === 'me' ? myName : otherName }}</span>
              <span>{{ m.type === 'redpacket' ? '🧧 ' : '' }}{{ m.content }}</span>
              <button class="wt-wechat__del" @click="messages.splice(i, 1)">×</button>
            </div>
          </div>
          <div class="wt-wechat__add">
            <select v-model="newSender" class="wt-select">
              <option value="other">{{ otherName }}</option>
              <option value="me">{{ myName }}</option>
            </select>
            <input v-model="newMsg" class="wt-input" placeholder="输入消息..." @keyup.enter="addMessage" />
            <button class="wt-btn" @click="addMessage">添加</button>
            <button v-if="mode === 'pro'" class="wt-btn wt-btn--ghost" @click="addRedPacket">红包</button>
          </div>
          <button class="wt-btn wt-btn--ghost" @click="loadTemplate">加载模板</button>
        </template>

        <template v-else-if="mode === 'moments'">
          <label class="wt-field"><span>朋友圈内容</span><textarea v-model="momentText" class="wt-textarea" rows="4" /></label>
          <label class="wt-field"><span>点赞数</span><input v-model.number="momentLikes" type="number" class="wt-input" /></label>
        </template>
      </div>

      <div ref="previewRef" class="wt-wechat__phone">
        <!-- 单聊/群聊 -->
        <template v-if="mode === 'chat' || mode === 'pro' || mode === 'group'">
          <div class="wt-wechat__statusbar">
            <span>9:41</span><span>📶 🔋</span>
          </div>
          <div class="wt-wechat__navbar">
            <span>‹</span>
            <span>{{ chatTitle }}</span>
            <span>⋯</span>
          </div>
          <div class="wt-wechat__chat">
            <div v-for="(m, i) in messages" :key="i" class="wt-wechat__bubble-row" :class="{ 'wt-wechat__bubble-row--me': m.sender === 'me' }">
              <div class="wt-wechat__avatar">{{ m.sender === 'me' ? myName[0] : otherName[0] }}</div>
              <div v-if="m.type === 'redpacket'" class="wt-wechat__redpacket">
                <span>🧧</span>
                <div><strong>{{ m.content }}</strong><small>微信红包</small></div>
              </div>
              <div v-else class="wt-wechat__bubble">{{ m.content }}</div>
            </div>
          </div>
          <div class="wt-wechat__inputbar">输入消息...</div>
        </template>

        <!-- 朋友圈 -->
        <template v-else-if="mode === 'moments'">
          <div class="wt-wechat__statusbar"><span>9:41</span><span>📶 🔋</span></div>
          <div class="wt-wechat__navbar"><span>‹</span><span>朋友圈</span><span>📷</span></div>
          <div class="wt-wechat__moments">
            <div class="wt-wechat__moments-head">
              <div class="wt-wechat__moments-cover" />
              <div class="wt-wechat__moments-name">{{ myName }}</div>
            </div>
            <div class="wt-wechat__moments-card">
              <p>{{ momentText }}</p>
              <div class="wt-wechat__moments-meta">
                <span>刚刚</span>
                <span>♡ {{ momentLikes }}</span>
              </div>
              <div v-if="momentComments.length" class="wt-wechat__moments-comments">
                <div v-for="(c, i) in momentComments" :key="i"><strong>{{ c.name }}</strong>: {{ c.text }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <button class="wt-btn" style="margin-top:16px" @click="exportImage">导出截图</button>
  </div>
</template>

<style scoped>
.wt-wechat__layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; margin-top: 16px; }
@media (max-width: 900px) { .wt-wechat__layout { grid-template-columns: 1fr; } }
.wt-wechat__phone {
  width: 320px; background: #ededed; border-radius: 24px; overflow: hidden;
  border: 8px solid #1a1a1a; box-shadow: 0 20px 60px rgba(0,0,0,0.2); font-size: 14px;
}
.wt-wechat__statusbar { display: flex; justify-content: space-between; padding: 6px 16px; background: #ededed; font-size: 12px; font-weight: 600; }
.wt-wechat__navbar { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; background: #ededed; border-bottom: 1px solid #d9d9d9; font-weight: 600; }
.wt-wechat__chat { min-height: 400px; max-height: 500px; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 12px; }
.wt-wechat__bubble-row { display: flex; align-items: flex-start; gap: 8px; }
.wt-wechat__bubble-row--me { flex-direction: row-reverse; }
.wt-wechat__avatar { width: 36px; height: 36px; border-radius: 6px; background: #576b95; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
.wt-wechat__bubble-row--me .wt-wechat__avatar { background: #07c160; }
.wt-wechat__bubble { max-width: 200px; padding: 10px 12px; background: #fff; border-radius: 4px; line-height: 1.5; word-break: break-word; position: relative; }
.wt-wechat__bubble-row--me .wt-wechat__bubble { background: #95ec69; }
.wt-wechat__redpacket { display: flex; gap: 8px; align-items: center; background: #fa9d3b; color: #fff; padding: 10px 14px; border-radius: 6px; max-width: 220px; }
.wt-wechat__redpacket small { display: block; opacity: 0.8; font-size: 11px; }
.wt-wechat__inputbar { padding: 10px 16px; background: #f7f7f7; border-top: 1px solid #d9d9d9; color: #999; font-size: 13px; }
.wt-wechat__msg-list { max-height: 200px; overflow-y: auto; margin: 12px 0; border: 1px solid var(--wt-border); border-radius: 8px; }
.wt-wechat__msg-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-bottom: 1px solid var(--wt-border); font-size: 13px; }
.wt-wechat__msg-badge { font-size: 11px; color: var(--wt-text-muted); min-width: 40px; }
.wt-wechat__del { margin-left: auto; color: #999; font-size: 16px; }
.wt-wechat__add { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.wt-wechat__add .wt-input { flex: 1; min-width: 120px; }
.wt-wechat__moments-head { position: relative; margin-bottom: 40px; }
.wt-wechat__moments-cover { height: 160px; background: linear-gradient(135deg, #576b95, #3e5f8a); }
.wt-wechat__moments-name { position: absolute; right: 16px; bottom: -20px; font-weight: 600; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
.wt-wechat__moments-card { background: #fff; margin: 0 12px 12px; padding: 12px; border-radius: 4px; }
.wt-wechat__moments-meta { display: flex; justify-content: space-between; color: #999; font-size: 12px; margin-top: 8px; }
.wt-wechat__moments-comments { background: #f7f7f7; padding: 8px; margin-top: 8px; border-radius: 4px; font-size: 13px; line-height: 1.6; }
</style>
