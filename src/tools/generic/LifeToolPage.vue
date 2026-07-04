<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getToolById } from '../../data/tools'
import * as calc from '../../utils/calculators'
import QRCode from 'qrcode'

const route = useRoute()
const tool = computed(() => getToolById(route.params.id))
const output = ref('')
const error = ref('')

// shared state
const birthDate = ref('2000-01-01')
const bonus = ref(50000)
const principal = ref(100000)
const rate = ref(4.5)
const months = ref(36)
const date1 = ref(new Date().toISOString().slice(0, 10))
const date2 = ref('2026-12-31')
const days = ref(30)
const idCard = ref('')
const names = ref('张三\n李四\n王五\n赵六')
const phone = ref('13800138000')
const phones = ref('')
const gender = ref('male')
const fatherH = ref(175)
const motherH = ref(162)
const birthYear = ref(1990)
const birthMonth = ref(6)
const retireGender = ref('male')
const coinCount = ref(1)
const coinResult = ref([])
const merit = ref(0)
const todos = ref(JSON.parse(localStorage.getItem('wt-todos') || '[]'))
const newTodo = ref('')
const countdown = ref({ d: 0, h: 0, m: 0, s: 0 })
const worldTimes = ref([])
const pressedKeys = ref(new Set())
const mouseBtn = ref('')
const wifiSsid = ref('MyWiFi')
const wifiPwd = ref('password')
const wifiEncrypt = ref('WPA')
const qrDataUrl = ref('')
const marqueeText = ref('欢迎使用 素盒工具箱')
const marqueeColor = ref('#ffffff')
const marqueeBg = ref('#6366f1')
const alarmTime = ref('09:00')
const uuidCount = ref(5)
const resignName = ref('张三')
const resignDate = ref(new Date().toISOString().slice(0, 10))
const resignReason = ref('个人发展')
const loveAge = ref(25)
const festivalIdx = ref(0)
const wechatPath = ref('C:\\Program Files\\Tencent\\WeChat\\WeChat.exe')
const wechatCount = ref(2)
const payslipName = ref('张三')
const payslipBase = ref(8000)
const payslipBonus = ref(2000)
const payslipDeduct = ref(1500)
const speakerOn = ref(false)
let audioCtx, oscillator, timer, alarmTimer

function run(fn) {
  error.value = ''
  try { output.value = fn() } catch (e) { error.value = e.message }
}

function calcAgeNow() { run(() => { const r = calc.calcAge(birthDate.value); return `周岁: ${r.zhou} 岁\n虚岁: ${r.xu} 岁\n已存活: ${r.days} 天` }) }
function calcBonus() { run(() => { const r = calc.calcBonusTax(bonus.value); return `应缴税款: ¥${r.tax.toFixed(2)}\n税后收入: ¥${r.afterTax.toFixed(2)}` }) }
function calcLoan() { run(() => { const r = calc.calcLoan(principal.value, rate.value, months.value); return `月供: ¥${r.monthly}\n总还款: ¥${r.total}\n总利息: ¥${r.interest}` }) }
function calcDateDiffFn() { run(() => `相差 ${calc.calcDateDiff(date1.value, date2.value)} 天`) }
function calcAddDays() { run(() => `${date1.value} + ${days.value} 天 = ${calc.addDays(date1.value, days.value)}`) }
function parseId() { run(() => JSON.stringify(calc.parseIdCard(idCard.value), null, 2)) }
function birthInfo() { run(() => JSON.stringify(calc.getBirthInfo(birthDate.value), null, 2)) }
function babyHeight() { run(() => `预测成年身高: ${calc.predictBabyHeight(fatherH.value, motherH.value, gender.value)} cm`) }
function retirement() { run(() => JSON.stringify(calc.calcRetirement(birthYear.value, birthMonth.value, retireGender.value), null, 2)) }
function randomQuote() { output.value = calc.QUOTES[Math.floor(Math.random() * calc.QUOTES.length)] }
function randomName() { output.value = calc.BABY_NAMES[gender.value][Math.floor(Math.random() * 10)] }
function funnyName() { output.value = calc.FUNNY_NAMES[Math.floor(Math.random() * calc.FUNNY_NAMES.length)] }
function randomPick() { const list = names.value.split('\n').filter(Boolean); output.value = list[Math.floor(Math.random() * list.length)] }
function phoneLoc() { run(() => { const p = phone.value.slice(0, 3); return `号段 ${p}: ${calc.PHONE_PREFIX[p] || '未知'} (参考数据)` }) }
function phoneDedup() { run(() => [...new Set(phones.value.split('\n').map(s => s.trim()).filter(Boolean))].join('\n')) }
function phoneMask() { run(() => { const p = phone.value.replace(/\*/g, '\\d'); return `可能号码模式: ${p}` }) }
function genUuid() { run(() => Array.from({ length: uuidCount.value }, () => crypto.randomUUID()).join('\n')) }
function flipCoin() { coinResult.value = Array.from({ length: coinCount.value }, () => Math.random() < 0.5 ? '正面' : '反面') }
function genResign() { output.value = `辞职信\n\n尊敬的领导：\n\n本人${resignName.value}，因${resignReason.value}原因，决定于${resignDate.value}辞去现职，望批准。\n\n此致\n敬礼\n\n${resignName.value}\n${resignDate.value}` }
function genWechat() { run(() => Array.from({ length: wechatCount.value }, (_, i) => `start "" "${wechatPath.value}"`).join('\n')) }
function genPayslip() { run(() => `工资条 - ${payslipName.value}\n基本工资: ¥${payslipBase.value}\n奖金: ¥${payslipBonus.value}\n扣除: ¥${payslipDeduct.value}\n实发: ¥${payslipBase.value + payslipBonus.value - payslipDeduct.value}`) }
function loveAgeCalc() { run(() => `恋爱次数: ${Math.max(1, Math.floor(loveAge.value / 3))} 次 (娱乐计算)`) }

function addTodo() {
  if (!newTodo.value.trim()) return
  todos.value.push({ text: newTodo.value, done: false, id: Date.now() })
  newTodo.value = ''
  localStorage.setItem('wt-todos', JSON.stringify(todos.value))
}
function toggleTodo(id) { const t = todos.value.find(x => x.id === id); if (t) t.done = !t.done; localStorage.setItem('wt-todos', JSON.stringify(todos.value)) }
function delTodo(id) { todos.value = todos.value.filter(x => x.id !== id); localStorage.setItem('wt-todos', JSON.stringify(todos.value)) }

async function genWifiQr() {
  const enc = wifiEncrypt.value === 'nopass' ? 'nopass' : wifiEncrypt.value
  const str = enc === 'nopass' ? `WIFI:T:nopass;S:${wifiSsid.value};;` : `WIFI:T:${enc};S:${wifiSsid.value};P:${wifiPwd.value};;`
  qrDataUrl.value = await QRCode.toDataURL(str, { width: 256 })
}

function updateCountdown() {
  const target = tool.value?.target || calc.FESTIVALS[festivalIdx.value]?.date
  if (!target) return
  const diff = new Date(target) - new Date()
  if (diff <= 0) { countdown.value = { d: 0, h: 0, m: 0, s: 0 }; return }
  countdown.value = {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

function updateWorldTime() {
  const zones = tool.value?.tz ? [tool.value.tz] : ['Asia/Shanghai','Asia/Tokyo','Asia/Seoul','Asia/Singapore','America/New_York','Europe/London','Europe/Paris']
  worldTimes.value = zones.map(tz => ({
    tz,
    time: new Date().toLocaleString('zh-CN', { timeZone: tz, hour12: false }),
  }))
}

function toggleSpeaker() {
  if (speakerOn.value) { oscillator?.stop(); speakerOn.value = false; return }
  audioCtx = new AudioContext()
  oscillator = audioCtx.createOscillator()
  oscillator.frequency.value = 165
  oscillator.connect(audioCtx.destination)
  oscillator.start()
  speakerOn.value = true
}

function onKey(e) { pressedKeys.value = new Set([...pressedKeys.value, e.key]); setTimeout(() => pressedKeys.value.delete(e.key), 2000) }
function onMouse(e) { mouseBtn.value = ['左键','中键','右键','侧键1','侧键2'][e.button] || `按钮${e.button}` }

// stopwatch
const swRunning = ref(false)
const swTime = ref(0)
const swLaps = ref([])
let swTimer
function swStart() { if (!swRunning.value) { swRunning.value = true; swTimer = setInterval(() => swTime.value += 10, 10) } }
function swPause() { swRunning.value = false; clearInterval(swTimer) }
function swReset() { swPause(); swTime.value = 0; swLaps.value = [] }
function swLap() { swLaps.value.unshift(formatMs(swTime.value)) }
function formatMs(ms) { const m = Math.floor(ms/60000), s = Math.floor((ms%60000)/1000), cs = Math.floor((ms%1000)/10); return `${pad(m)}:${pad(s)}.${pad(cs)}` }
function pad(n) { return String(n).padStart(2, '0') }
const swDisplay = computed(() => formatMs(swTime.value))

onMounted(() => {
  timer = setInterval(() => { updateCountdown(); updateWorldTime() }, 1000)
  updateCountdown(); updateWorldTime()
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => { clearInterval(timer); clearInterval(swTimer); oscillator?.stop(); document.removeEventListener('keydown', onKey) })
</script>

<template>
  <div class="wt-tool-panel">
    <div v-if="error" class="wt-tool-panel__error">{{ error }}</div>

    <template v-if="tool?.type === 'age-calculator'">
      <label class="wt-field"><span>出生日期</span><input v-model="birthDate" type="date" class="wt-input" /></label>
      <button class="wt-btn" @click="calcAgeNow">计算</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'bonus-tax'">
      <label class="wt-field"><span>年终奖（元）</span><input v-model.number="bonus" type="number" class="wt-input" /></label>
      <button class="wt-btn" @click="calcBonus">计算</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'countdown' || tool?.type === 'festival-countdown'">
      <select v-if="tool?.type === 'festival-countdown'" v-model="festivalIdx" class="wt-select">
        <option v-for="(f, i) in calc.FESTIVALS" :key="i" :value="i">{{ f.name }}</option>
      </select>
      <div class="wt-countdown">
        <div class="wt-countdown__item"><span>{{ countdown.d }}</span><label>天</label></div>
        <div class="wt-countdown__item"><span>{{ countdown.h }}</span><label>时</label></div>
        <div class="wt-countdown__item"><span>{{ countdown.m }}</span><label>分</label></div>
        <div class="wt-countdown__item"><span>{{ countdown.s }}</span><label>秒</label></div>
      </div>
    </template>

    <template v-else-if="tool?.type === 'todo-list'">
      <div class="wt-todo-add"><input v-model="newTodo" class="wt-input" placeholder="新任务..." @keyup.enter="addTodo" /><button class="wt-btn" @click="addTodo">添加</button></div>
      <ul class="wt-todo-list">
        <li v-for="t in todos" :key="t.id" :class="{ done: t.done }">
          <input type="checkbox" :checked="t.done" @change="toggleTodo(t.id)" />
          <span>{{ t.text }}</span>
          <button @click="delTodo(t.id)">✕</button>
        </li>
      </ul>
    </template>

    <template v-else-if="tool?.type === 'speaker-clean'">
      <button class="wt-btn" @click="toggleSpeaker">{{ speakerOn ? '停止' : '开始清灰' }}</button>
      <p class="wt-hint">播放 165Hz 音频，请适当降低音量</p>
    </template>

    <template v-else-if="tool?.type === 'loan-calculator' || tool?.type === 'car-loan' || tool?.type === 'loan-interest'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>贷款金额</span><input v-model.number="principal" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>年利率(%)</span><input v-model.number="rate" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>期数(月)</span><input v-model.number="months" type="number" class="wt-input" /></label>
      </div>
      <button class="wt-btn" @click="calcLoan">计算</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'date-diff'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>日期1</span><input v-model="date1" type="date" class="wt-input" /></label>
        <label class="wt-field"><span>日期2</span><input v-model="date2" type="date" class="wt-input" /></label>
        <label class="wt-field"><span>增加天数</span><input v-model.number="days" type="number" class="wt-input" /></label>
      </div>
      <button class="wt-btn" @click="calcDateDiffFn">计算天数差</button>
      <button class="wt-btn wt-btn--ghost" @click="calcAddDays">推算日期</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'world-time' || tool?.type === 'world-time-all'">
      <div class="wt-info-grid">
        <div v-for="w in worldTimes" :key="w.tz" class="wt-info-item">
          <span class="wt-info-item__label">{{ w.tz }}</span>
          <span class="wt-info-item__value">{{ w.time }}</span>
        </div>
      </div>
    </template>

    <template v-else-if="tool?.type === 'stopwatch'">
      <div class="wt-stopwatch">{{ swDisplay }}</div>
      <div class="wt-tool-panel__actions">
        <button class="wt-btn" @click="swStart">开始</button>
        <button class="wt-btn wt-btn--ghost" @click="swPause">暂停</button>
        <button class="wt-btn wt-btn--ghost" @click="swLap">计次</button>
        <button class="wt-btn wt-btn--ghost" @click="swReset">重置</button>
      </div>
      <div v-for="(l, i) in swLaps" :key="i" class="wt-lap">{{ l }}</div>
    </template>

    <template v-else-if="tool?.type === 'wifi-qrcode'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>WiFi名称</span><input v-model="wifiSsid" class="wt-input" /></label>
        <label class="wt-field"><span>密码</span><input v-model="wifiPwd" class="wt-input" /></label>
        <label class="wt-field"><span>加密</span>
          <select v-model="wifiEncrypt" class="wt-select"><option value="WPA">WPA</option><option value="WEP">WEP</option><option value="nopass">无密码</option></select>
        </label>
      </div>
      <button class="wt-btn" @click="genWifiQr">生成</button>
      <img v-if="qrDataUrl" :src="qrDataUrl" class="wt-qr-preview" />
    </template>

    <template v-else-if="tool?.type === 'uuid-generator'">
      <label class="wt-field"><span>数量</span><input v-model.number="uuidCount" type="number" min="1" max="50" class="wt-input" /></label>
      <button class="wt-btn" @click="genUuid">生成</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'id-card'">
      <input v-model="idCard" class="wt-input" placeholder="输入身份证号" />
      <button class="wt-btn" @click="parseId">解析</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'coin-flip'">
      <label class="wt-field"><span>硬币数量</span><input v-model.number="coinCount" type="number" min="1" max="10" class="wt-input" /></label>
      <button class="wt-btn" @click="flipCoin">抛硬币</button>
      <div class="wt-coins"><span v-for="(c, i) in coinResult" :key="i" class="wt-coin">{{ c }}</span></div>
    </template>

    <template v-else-if="tool?.type === 'random-pick'">
      <textarea v-model="names" class="wt-textarea" placeholder="每行一个名字" />
      <button class="wt-btn" @click="randomPick">随机抽取</button>
      <div class="wt-result-box" v-if="output">{{ output }}</div>
    </template>

    <template v-else-if="tool?.type === 'phone-location'">
      <input v-model="phone" class="wt-input" placeholder="手机号" />
      <button class="wt-btn" @click="phoneLoc">查询</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'phone-dedup'">
      <textarea v-model="phones" class="wt-textarea" placeholder="每行一个手机号" />
      <button class="wt-btn" @click="phoneDedup">去重</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'keyboard-test'">
      <p>请按下任意键：</p>
      <div class="wt-keys"><span v-for="k in [...pressedKeys]" :key="k" class="wt-key">{{ k }}</span></div>
    </template>

    <template v-else-if="tool?.type === 'mouse-test'">
      <div class="wt-mouse-area" @mousedown="onMouse">在此区域点击鼠标</div>
      <p v-if="mouseBtn">检测到：{{ mouseBtn }}</p>
    </template>

    <template v-else-if="tool?.type === 'wooden-fish'">
      <button class="wt-wooden-fish" @click="merit++">🪵 敲一下</button>
      <p>功德 +{{ merit }}</p>
    </template>

    <template v-else-if="tool?.type === 'quotes'">
      <button class="wt-btn" @click="randomQuote">随机语录</button>
      <div class="wt-result-box">{{ output }}</div>
    </template>

    <template v-else-if="tool?.type === 'baby-name'">
      <select v-model="gender" class="wt-select"><option value="male">男</option><option value="female">女</option></select>
      <button class="wt-btn" @click="randomName">生成</button>
      <div class="wt-result-box">{{ output }}</div>
    </template>

    <template v-else-if="tool?.type === 'baby-height'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>父亲身高(cm)</span><input v-model.number="fatherH" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>母亲身高(cm)</span><input v-model.number="motherH" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>性别</span><select v-model="gender" class="wt-select"><option value="male">男</option><option value="female">女</option></select></label>
      </div>
      <button class="wt-btn" @click="babyHeight">预测</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'birth-info'">
      <input v-model="birthDate" type="date" class="wt-input" />
      <button class="wt-btn" @click="birthInfo">查询</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'retirement-age'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>出生年</span><input v-model.number="birthYear" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>出生月</span><input v-model.number="birthMonth" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>性别</span><select v-model="retireGender" class="wt-select"><option value="male">男</option><option value="female">女</option></select></label>
      </div>
      <button class="wt-btn" @click="retirement">计算</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'holiday-2026'">
      <div class="wt-info-grid">
        <div v-for="h in calc.HOLIDAYS_2026" :key="h.name" class="wt-info-item">
          <span class="wt-info-item__label">{{ h.name }}</span>
          <span class="wt-info-item__value">{{ h.days }}</span>
        </div>
      </div>
    </template>

    <template v-else-if="tool?.type === 'first-aid-kit'">
      <ul class="wt-list"><li v-for="item in calc.FIRST_AID" :key="item">{{ item }}</li></ul>
    </template>

    <template v-else-if="tool?.type === 'funny-group-names'">
      <button class="wt-btn" @click="funnyName">随机群名</button>
      <div class="wt-result-box">{{ output }}</div>
    </template>

    <template v-else-if="tool?.type === 'resignation-letter'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>姓名</span><input v-model="resignName" class="wt-input" /></label>
        <label class="wt-field"><span>离职日期</span><input v-model="resignDate" type="date" class="wt-input" /></label>
        <label class="wt-field"><span>原因</span><input v-model="resignReason" class="wt-input" /></label>
      </div>
      <button class="wt-btn" @click="genResign">生成</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'wechat-multi'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>微信路径</span><input v-model="wechatPath" class="wt-input" /></label>
        <label class="wt-field"><span>多开数量</span><input v-model.number="wechatCount" type="number" min="2" max="10" class="wt-input" /></label>
      </div>
      <button class="wt-btn" @click="genWechat">生成脚本</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'led-marquee'">
      <input v-model="marqueeText" class="wt-input" />
      <div class="wt-marquee" :style="{ background: marqueeBg, color: marqueeColor }">
        <span class="wt-marquee__text">{{ marqueeText }}</span>
      </div>
    </template>

    <template v-else-if="tool?.type === 'fake-upgrade'">
      <div class="wt-fake-upgrade" @click="$event.target.requestFullscreen?.()">
        <div class="wt-fake-upgrade__spinner" />
        <p>正在安装更新 35%</p>
        <p class="wt-hint">按 ESC 退出全屏</p>
      </div>
    </template>

    <template v-else-if="tool?.type === 'payslip'">
      <div class="wt-form-grid">
        <label class="wt-field"><span>姓名</span><input v-model="payslipName" class="wt-input" /></label>
        <label class="wt-field"><span>基本工资</span><input v-model.number="payslipBase" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>奖金</span><input v-model.number="payslipBonus" type="number" class="wt-input" /></label>
        <label class="wt-field"><span>扣除</span><input v-model.number="payslipDeduct" type="number" class="wt-input" /></label>
      </div>
      <button class="wt-btn" @click="genPayslip">生成</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'love-age'">
      <input v-model.number="loveAge" type="number" class="wt-input" placeholder="年龄" />
      <button class="wt-btn" @click="loveAgeCalc">计算</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'lunar-calendar'">
      <input v-model="birthDate" type="date" class="wt-input" />
      <p class="wt-hint">农历转换需要农历库支持，当前显示公历：{{ birthDate }}</p>
    </template>

    <template v-else-if="tool?.type === 'work-schedule'">
      <p class="wt-hint">输入人员名单（每行一个），系统将生成轮班表</p>
      <textarea v-model="names" class="wt-textarea" />
      <button class="wt-btn" @click="output = names.split('\n').filter(Boolean).map((n,i) => `第${i+1}天: ${n}`).join('\n')">生成排班</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'work-alarm'">
      <input v-model="alarmTime" type="time" class="wt-input" />
      <button class="wt-btn" @click="new Notification('素盒闹钟', { body: '提醒时间到！' })">测试提醒</button>
    </template>

    <template v-else-if="tool?.type === 'colorblind-test'">
      <div v-for="(t, i) in calc.COLORBLIND_TESTS" :key="i" class="wt-info-item">
        <p>{{ t.q }}</p>
        <div class="wt-colorblind" :style="{ background: t.color || '#eee' }" />
      </div>
    </template>

    <template v-else-if="tool?.type === 'phone-mask'">
      <input v-model="phone" class="wt-input" placeholder="如 138****8000" />
      <button class="wt-btn" @click="phoneMask">分析</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>

    <template v-else-if="tool?.type === 'university-list'">
      <button class="wt-btn" @click="output = '985: 清华大学、北京大学、复旦大学...\n211: 北京邮电大学、上海财经大学...\n双一流: 详见教育部官网'">显示名单</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>
    <template v-else-if="tool?.type === 'china-map'">
      <p class="wt-hint">中国行政区划高清地图（示意）</p>
      <div style="height:300px;background:linear-gradient(135deg,#e0f2fe,#bae6fd);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#0369a1;font-weight:600">🗺️ 中国地图区域</div>
    </template>
    <template v-else-if="tool?.type === 'world-map'">
      <div style="height:300px;background:linear-gradient(135deg,#dbeafe,#93c5fd);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#1d4ed8;font-weight:600">🌍 世界地图区域</div>
    </template>
    <template v-else-if="tool?.type === 'female-speech-decode'">
      <input v-model="input" class="wt-input" placeholder="输入对方的话" />
      <button class="wt-btn" @click="output = '解读：可能是在试探你的态度，建议真诚回应。'">解读</button>
      <pre class="wt-output">{{ output }}</pre>
    </template>
    <template v-else-if="['qq-group-info','email-bulk-sender','yellow-pages-114'].includes(tool?.type)">
      <p class="wt-hint">该工具需要外部 API 支持，当前为功能入口占位。</p>
    </template>
  </div>
</template>

<style scoped>
.wt-output { margin-top: 12px; padding: 14px; background: #f8fafc; border-radius: 8px; white-space: pre-wrap; font-size: 14px; min-height: 60px; }
.wt-countdown { display: flex; gap: 16px; justify-content: center; padding: 32px; }
.wt-countdown__item { text-align: center; }
.wt-countdown__item span { display: block; font-size: 48px; font-weight: 700; color: var(--wt-primary); }
.wt-countdown__item label { font-size: 14px; color: var(--wt-text-muted); }
.wt-stopwatch { font-size: 48px; font-weight: 700; text-align: center; font-family: monospace; margin: 20px 0; }
.wt-todo-add { display: flex; gap: 8px; margin-bottom: 12px; }
.wt-todo-list { list-style: none; }
.wt-todo-list li { display: flex; align-items: center; gap: 8px; padding: 8px; border-bottom: 1px solid var(--wt-border); }
.wt-todo-list li.done span { text-decoration: line-through; color: var(--wt-text-muted); }
.wt-qr-preview { display: block; margin: 16px auto; }
.wt-keys, .wt-coins { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.wt-key, .wt-coin { padding: 8px 14px; background: var(--wt-primary-light); border-radius: 8px; font-weight: 600; }
.wt-mouse-area { padding: 60px; border: 2px dashed var(--wt-border); border-radius: 12px; text-align: center; cursor: pointer; }
.wt-wooden-fish { font-size: 48px; background: none; border: none; cursor: pointer; }
.wt-wooden-fish:active { transform: scale(0.95); }
.wt-marquee { overflow: hidden; padding: 20px; border-radius: 8px; }
.wt-marquee__text { display: inline-block; animation: wt-marquee 8s linear infinite; font-size: 24px; font-weight: 700; white-space: nowrap; }
@keyframes wt-marquee { from { transform: translateX(100%); } to { transform: translateX(-100%); } }
.wt-fake-upgrade { background: #0078d4; color: #fff; padding: 80px 40px; text-align: center; border-radius: 12px; min-height: 300px; }
.wt-fake-upgrade__spinner { width: 40px; height: 40px; border: 3px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: wt-spin .8s linear infinite; margin: 0 auto 20px; }
.wt-list { padding-left: 20px; line-height: 2; }
.wt-lap { padding: 4px 0; font-family: monospace; }
.wt-colorblind { height: 80px; border-radius: 8px; margin: 8px 0; }
.wt-result-box { padding: 16px; background: var(--wt-primary-light); border-radius: 8px; font-size: 18px; font-weight: 600; color: var(--wt-primary); margin-top: 12px; text-align: center; }
@keyframes wt-spin { to { transform: rotate(360deg); } }
</style>
