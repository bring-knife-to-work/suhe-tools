<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getToolById } from '../../data/tools'

const route = useRoute()
const tool = computed(() => getToolById(route.params.id))

// decibel meter
const decibel = ref(0)
const maxDb = ref(0)
const minDb = ref(100)
let audioStream, analyser, animFrame

async function startDecibel() {
  try {
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const ctx = new AudioContext()
    const source = ctx.createMediaStreamSource(audioStream)
    analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)
    const data = new Uint8Array(analyser.frequencyBinCount)
    function tick() {
      analyser.getByteFrequencyData(data)
      const avg = data.reduce((a, b) => a + b, 0) / data.length
      const db = Math.round(20 * Math.log10(avg / 255 * 100 + 1))
      decibel.value = db
      maxDb.value = Math.max(maxDb.value, db)
      minDb.value = Math.min(minDb.value, db)
      animFrame = requestAnimationFrame(tick)
    }
    tick()
  } catch (e) { alert('需要麦克风权限') }
}

function stopDecibel() {
  cancelAnimationFrame(animFrame)
  audioStream?.getTracks().forEach(t => t.stop())
}

// audio recorder
const recording = ref(false)
const audioUrl = ref('')
let mediaRecorder, chunks = []

async function startRecord() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  mediaRecorder = new MediaRecorder(stream)
  chunks = []
  mediaRecorder.ondataavailable = e => chunks.push(e.data)
  mediaRecorder.onstop = () => { audioUrl.value = URL.createObjectURL(new Blob(chunks, { type: 'audio/webm' })) }
  mediaRecorder.start()
  recording.value = true
}
function stopRecord() { mediaRecorder?.stop(); recording.value = false }

// audio player
const audioFile = ref('')
function onAudioFile(e) { audioFile.value = URL.createObjectURL(e.target.files[0]) }

// video player
const videoFile = ref('')
function onVideoFile(e) { videoFile.value = URL.createObjectURL(e.target.files[0]) }

// text to speech
const ttsText = ref('你好，欢迎使用 素盒工具箱')
function speak() {
  const u = new SpeechSynthesisUtterance(ttsText.value)
  u.lang = 'zh-CN'
  speechSynthesis.speak(u)
}

// screen recorder
const screenUrl = ref('')
const screenRecording = ref(false)
let screenRecorder, screenChunks = []

async function startScreen() {
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
  screenRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
  screenChunks = []
  screenRecorder.ondataavailable = e => screenChunks.push(e.data)
  screenRecorder.onstop = () => { screenUrl.value = URL.createObjectURL(new Blob(screenChunks, { type: 'video/webm' })) }
  screenRecorder.start()
  screenRecording.value = true
}
function stopScreen() { screenRecorder?.stop(); screenRecording.value = false }

// alipay voice
const alipayAmount = ref('100.00')
function playAlipay() {
  const u = new SpeechSynthesisUtterance(`支付宝到账${alipayAmount.value}元`)
  u.lang = 'zh-CN'
  u.rate = 1.1
  speechSynthesis.speak(u)
}

// audio convert (basic wav from recording)
const convertMsg = ref('浏览器的音频格式转换能力有限，录音默认输出 WebM 格式')

onUnmounted(() => stopDecibel())
</script>

<template>
  <div class="wt-tool-panel">
    <template v-if="tool?.type === 'decibel-meter'">
      <div class="wt-decibel">
        <span class="wt-decibel__value">{{ decibel }}</span>
        <span class="wt-decibel__unit">dB</span>
      </div>
      <p>最大: {{ maxDb }} dB | 最小: {{ minDb }} dB</p>
      <button class="wt-btn" @click="startDecibel">开始检测</button>
      <button class="wt-btn wt-btn--ghost" @click="stopDecibel">停止</button>
    </template>

    <template v-else-if="tool?.type === 'audio-recorder'">
      <button class="wt-btn" @click="recording ? stopRecord() : startRecord()">{{ recording ? '停止录音' : '开始录音' }}</button>
      <audio v-if="audioUrl" :src="audioUrl" controls class="wt-media-player" />
    </template>

    <template v-else-if="tool?.type === 'audio-player'">
      <input type="file" accept="audio/*" @change="onAudioFile" />
      <audio v-if="audioFile" :src="audioFile" controls class="wt-media-player" />
    </template>

    <template v-else-if="tool?.type === 'video-player'">
      <input type="file" accept="video/*" @change="onVideoFile" />
      <video v-if="videoFile" :src="videoFile" controls class="wt-media-player" />
    </template>

    <template v-else-if="tool?.type === 'text-to-speech'">
      <textarea v-model="ttsText" class="wt-textarea" />
      <button class="wt-btn" @click="speak">朗读</button>
    </template>

    <template v-else-if="tool?.type === 'screen-recorder'">
      <button class="wt-btn" @click="screenRecording ? stopScreen() : startScreen()">{{ screenRecording ? '停止录制' : '开始录屏' }}</button>
      <video v-if="screenUrl" :src="screenUrl" controls class="wt-media-player" />
      <a v-if="screenUrl" :href="screenUrl" download="screen-record.webm" class="wt-btn wt-btn--ghost">下载</a>
    </template>

    <template v-else-if="tool?.type === 'alipay-voice'">
      <input v-model="alipayAmount" class="wt-input" placeholder="金额" />
      <button class="wt-btn" @click="playAlipay">播放语音</button>
    </template>

    <template v-else-if="tool?.type === 'audio-convert'">
      <p class="wt-hint">{{ convertMsg }}</p>
      <input type="file" accept="audio/*" @change="onAudioFile" />
      <audio v-if="audioFile" :src="audioFile" controls class="wt-media-player" />
    </template>

    <template v-else-if="tool?.type === 'video-mute'">
      <p class="wt-hint">视频去音频需要 FFmpeg 支持。当前版本请使用录屏工具获取无声视频，或下载后使用本地工具处理。</p>
      <input type="file" accept="video/*" @change="onVideoFile" />
      <video v-if="videoFile" :src="videoFile" controls muted class="wt-media-player" />
    </template>
  </div>
</template>

<style scoped>
.wt-decibel { text-align: center; padding: 40px; }
.wt-decibel__value { font-size: 72px; font-weight: 700; color: var(--wt-primary); }
.wt-decibel__unit { font-size: 24px; color: var(--wt-text-muted); }
.wt-media-player { width: 100%; margin-top: 16px; }
</style>
