export function calcAge(birthDate) {
  const birth = new Date(birthDate)
  const now = new Date()
  if (isNaN(birth.getTime())) throw new Error('无效日期')
  let zhou = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) zhou--
  const xu = now.getFullYear() - birth.getFullYear() + 1
  return { zhou, xu, days: Math.floor((now - birth) / 86400000) }
}

export function calcBonusTax(bonus) {
  const b = Number(bonus)
  if (isNaN(b) || b <= 0) throw new Error('无效奖金')
  const monthly = b / 12
  let rate = 0.03, deduct = 0
  if (monthly > 80000) { rate = 0.45; deduct = 15160 }
  else if (monthly > 55000) { rate = 0.35; deduct = 7160 }
  else if (monthly > 35000) { rate = 0.30; deduct = 4410 }
  else if (monthly > 25000) { rate = 0.25; deduct = 2660 }
  else if (monthly > 12000) { rate = 0.20; deduct = 1410 }
  else if (monthly > 3000) { rate = 0.10; deduct = 210 }
  const tax = b * rate - deduct
  return { tax: Math.max(0, tax), afterTax: b - Math.max(0, tax) }
}

export function calcLoan(principal, rate, months, type = 'equal') {
  const p = Number(principal), r = Number(rate) / 100 / 12, n = Number(months)
  if (isNaN(p) || isNaN(r) || isNaN(n)) throw new Error('无效参数')
  if (type === 'equal') {
    const monthly = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    return { monthly: monthly.toFixed(2), total: (monthly * n).toFixed(2), interest: (monthly * n - p).toFixed(2) }
  }
  const principalPart = p / n
  let totalInterest = 0, firstMonth = 0
  for (let i = 0; i < n; i++) {
    const interest = (p - principalPart * i) * r
    if (i === 0) firstMonth = principalPart + interest
    totalInterest += interest
  }
  return { monthly: firstMonth.toFixed(2), total: (p + totalInterest).toFixed(2), interest: totalInterest.toFixed(2) }
}

export function calcDateDiff(d1, d2) {
  const a = new Date(d1), b = new Date(d2)
  if (isNaN(a) || isNaN(b)) throw new Error('无效日期')
  return Math.abs(Math.floor((b - a) / 86400000))
}

export function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + Number(days))
  return d.toISOString().slice(0, 10)
}

export function parseIdCard(id) {
  const s = id.trim()
  if (!/^\d{17}[\dXx]$/.test(s) && !/^\d{15}$/.test(s)) throw new Error('无效身份证号')
  const birth = s.length === 18 ? s.slice(6, 14) : '19' + s.slice(6, 12)
  const date = `${birth.slice(0,4)}-${birth.slice(4,6)}-${birth.slice(6,8)}`
  const gender = (s.length === 18 ? +s[16] : +s[14]) % 2 === 0 ? '女' : '男'
  const regions = { '11': '北京', '31': '上海', '44': '广东', '33': '浙江', '32': '江苏' }
  const region = regions[s.slice(0, 2)] || '未知地区'
  return { date, gender, region, age: calcAge(date).zhou }
}

export function predictBabyHeight(fH, mH, gender) {
  const f = Number(fH), m = Number(mH)
  if (gender === 'male') return ((f + m + 13) / 2).toFixed(1)
  return ((f + m - 13) / 2).toFixed(1)
}

export function calcRetirement(birthYear, birthMonth, gender) {
  const base = gender === 'male' ? 60 : 55
  const year = Number(birthYear), month = Number(birthMonth)
  const delay = Math.max(0, Math.floor((year - 1965) / 4))
  const retireAge = base + (gender === 'male' ? delay * 0.25 : delay * 0.5)
  const retireYear = year + Math.ceil(retireAge)
  return { retireAge: retireAge.toFixed(1), retireYear, retireMonth: month }
}

export const ZODIAC = ['猴','鸡','狗','猪','鼠','牛','虎','兔','龙','蛇','马','羊']
export const CONSTELLATION = ['摩羯座','水瓶座','双鱼座','白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座']
export const CONSTELLATION_DATES = [20, 19, 21, 21, 21, 22, 23, 23, 23, 24, 23, 22]

export function getBirthInfo(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d)) throw new Error('无效日期')
  const year = d.getFullYear(), month = d.getMonth() + 1, day = d.getDate()
  const zodiac = ZODIAC[year % 12]
  const ci = day < CONSTELLATION_DATES[month - 1] ? month - 1 : month
  const constellation = CONSTELLATION[ci] || '未知'
  const age = calcAge(dateStr)
  return { zodiac, constellation, ...age, weekday: ['日','一','二','三','四','五','六'][d.getDay()] }
}

export const QUOTES = [
  '生活不止眼前的苟且，还有诗和远方的田野。',
  '每一个不曾起舞的日子，都是对生命的辜负。',
  '你若盛开，蝴蝶自来。',
  '星光不问赶路人，时光不负有心人。',
  '种一棵树最好的时间是十年前，其次是现在。',
  '人生没有白走的路，每一步都算数。',
  '保持热爱，奔赴山海。',
  '愿你眼中总有光芒，活成你想要的模样。',
]

export const FUNNY_NAMES = [
  '贫穷限制了我的想象', '今天也要加油鸭', '摸鱼办驻地球办事处',
  '干饭人干饭魂', '摆烂但不摆烂', '打工人的快乐源泉',
  '甲方虐我千百遍', '代码写不完头发掉光', '周末不加班联盟',
]

export const BABY_NAMES = {
  male: ['浩然','子轩','宇航','梓豪','博文','天佑','明轩','俊杰','皓宇','逸辰'],
  female: ['欣怡','梓涵','诗涵','雨萱','思琪','梦瑶','佳怡','雅婷','静怡','语嫣'],
}

export const HOLIDAYS_2026 = [
  { name: '元旦', date: '2026-01-01', days: '1月1日-3日' },
  { name: '春节', date: '2026-02-17', days: '2月15日-23日' },
  { name: '清明节', date: '2026-04-05', days: '4月4日-6日' },
  { name: '劳动节', date: '2026-05-01', days: '5月1日-5日' },
  { name: '端午节', date: '2026-06-19', days: '6月19日-21日' },
  { name: '中秋节', date: '2026-09-25', days: '9月25日-27日' },
  { name: '国庆节', date: '2026-10-01', days: '10月1日-7日' },
]

export const FESTIVALS = [
  { name: '春节', date: '2026-02-17' },
  { name: '元宵节', date: '2026-02-24' },
  { name: '清明节', date: '2026-04-05' },
  { name: '劳动节', date: '2026-05-01' },
  { name: '端午节', date: '2026-06-19' },
  { name: '中秋节', date: '2026-09-25' },
  { name: '国庆节', date: '2026-10-01' },
  { name: '圣诞节', date: '2026-12-25' },
]

export const PHONE_PREFIX = {
  '130': '山东', '131': '江苏', '132': '广东', '133': '北京',
  '134': '广东', '135': '广东', '136': '广东', '137': '广东',
  '138': '广东', '139': '广东', '150': '江苏', '151': '江苏',
  '152': '江苏', '153': '四川', '155': '湖北', '156': '山东',
  '157': '云南', '158': '浙江', '159': '浙江', '170': '北京',
  '176': '广东', '177': '上海', '178': '广东', '180': '广东',
  '181': '广东', '182': '四川', '183': '广东', '184': '湖南',
  '185': '广东', '186': '广东', '187': '云南', '188': '广东',
  '189': '广东', '191': '广东', '199': '广东',
}

export const FIRST_AID = [
  '创可贴', '碘伏消毒液', '医用棉签', '医用纱布', '体温计',
  '退烧药', '止痛药', '抗过敏药', '止泻药', '感冒灵',
  '风油精', '红花油', '云南白药', '电子血压计',
]

export const COLORBLIND_TESTS = [
  { q: '上图中的数字是？', options: ['12', '29', '看不清'], answer: 0, color: '#c8e6c9' },
  { q: '红色盲测试：能分辨红绿交通灯吗？', options: ['能', '不能', '部分能'], answer: 0 },
  { q: '蓝黄色盲测试：天空和草地颜色是否正常？', options: ['正常', '混淆', '不确定'], answer: 0 },
]
