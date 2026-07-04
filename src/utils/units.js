export const UNIT_GROUPS = {
  length: {
    units: [
      { id: 'm', name: '米', factor: 1 },
      { id: 'km', name: '千米', factor: 1000 },
      { id: 'cm', name: '厘米', factor: 0.01 },
      { id: 'mm', name: '毫米', factor: 0.001 },
      { id: 'in', name: '英寸', factor: 0.0254 },
      { id: 'ft', name: '英尺', factor: 0.3048 },
      { id: 'yd', name: '码', factor: 0.9144 },
      { id: 'mi', name: '英里', factor: 1609.344 },
      { id: 'nmi', name: '海里', factor: 1852 },
    ],
  },
  weight: {
    units: [
      { id: 'kg', name: '千克', factor: 1 },
      { id: 'g', name: '克', factor: 0.001 },
      { id: 'mg', name: '毫克', factor: 0.000001 },
      { id: 't', name: '吨', factor: 1000 },
      { id: 'lb', name: '磅', factor: 0.45359237 },
      { id: 'oz', name: '盎司', factor: 0.0283495 },
      { id: 'jin', name: '斤', factor: 0.5 },
    ],
  },
  area: {
    units: [
      { id: 'm2', name: '平方米', factor: 1 },
      { id: 'km2', name: '平方千米', factor: 1e6 },
      { id: 'ha', name: '公顷', factor: 10000 },
      { id: 'mu', name: '亩', factor: 666.67 },
      { id: 'ft2', name: '平方英尺', factor: 0.092903 },
      { id: 'in2', name: '平方英寸', factor: 0.00064516 },
      { id: 'acre', name: '英亩', factor: 4046.86 },
    ],
  },
  volume: {
    units: [
      { id: 'l', name: '升', factor: 1 },
      { id: 'ml', name: '毫升', factor: 0.001 },
      { id: 'm3', name: '立方米', factor: 1000 },
      { id: 'gal_us', name: '加仑(美)', factor: 3.78541 },
      { id: 'gal_uk', name: '加仑(英)', factor: 4.54609 },
      { id: 'floz', name: '液体盎司', factor: 0.0295735 },
    ],
  },
  temperature: {
    special: true,
    units: [
      { id: 'c', name: '摄氏度' },
      { id: 'f', name: '华氏度' },
      { id: 'k', name: '开尔文' },
    ],
  },
  speed: {
    units: [
      { id: 'mps', name: '米/秒', factor: 1 },
      { id: 'kph', name: '千米/时', factor: 1 / 3.6 },
      { id: 'mph', name: '英里/时', factor: 0.44704 },
      { id: 'knot', name: '节', factor: 0.514444 },
      { id: 'fps', name: '英尺/秒', factor: 0.3048 },
    ],
  },
  windSpeed: {
    units: [
      { id: 'mps', name: '米/秒', factor: 1 },
      { id: 'kph', name: '千米/时', factor: 1 / 3.6 },
      { id: 'mph', name: '英里/时', factor: 0.44704 },
      { id: 'knot', name: '节', factor: 0.514444 },
      { id: 'fps', name: '英尺/秒', factor: 0.3048 },
      { id: 'bft', name: '蒲福风级', factor: null },
    ],
  },
  time: {
    units: [
      { id: 'ms', name: '毫秒', factor: 0.001 },
      { id: 's', name: '秒', factor: 1 },
      { id: 'min', name: '分钟', factor: 60 },
      { id: 'h', name: '小时', factor: 3600 },
      { id: 'd', name: '天', factor: 86400 },
      { id: 'wk', name: '周', factor: 604800 },
      { id: 'mo', name: '月(30天)', factor: 2592000 },
      { id: 'yr', name: '年(365天)', factor: 31536000 },
    ],
  },
  angle: {
    units: [
      { id: 'deg', name: '度', factor: 1 },
      { id: 'rad', name: '弧度', factor: 180 / Math.PI },
      { id: 'grad', name: '百分度', factor: 0.9 },
      { id: 'arcmin', name: '弧分', factor: 1 / 60 },
      { id: 'arcsec', name: '弧秒', factor: 1 / 3600 },
    ],
  },
  pressure: {
    units: [
      { id: 'pa', name: '帕斯卡', factor: 1 },
      { id: 'kpa', name: '千帕', factor: 1000 },
      { id: 'bar', name: '巴', factor: 100000 },
      { id: 'atm', name: '标准大气压', factor: 101325 },
      { id: 'mmhg', name: '毫米汞柱', factor: 133.322 },
      { id: 'psi', name: '磅/平方英寸', factor: 6894.76 },
    ],
  },
  power: {
    units: [
      { id: 'w', name: '瓦特', factor: 1 },
      { id: 'kw', name: '千瓦', factor: 1000 },
      { id: 'mw', name: '兆瓦', factor: 1e6 },
      { id: 'hp', name: '马力', factor: 745.7 },
      { id: 'ps', name: '公制马力', factor: 735.5 },
    ],
  },
  heat: {
    units: [
      { id: 'j', name: '焦耳', factor: 1 },
      { id: 'kj', name: '千焦', factor: 1000 },
      { id: 'cal', name: '卡路里', factor: 4.184 },
      { id: 'kcal', name: '千卡', factor: 4184 },
      { id: 'wh', name: '瓦时', factor: 3600 },
      { id: 'kwh', name: '千瓦时', factor: 3.6e6 },
    ],
  },
  frequency: {
    units: [
      { id: 'hz', name: '赫兹', factor: 1 },
      { id: 'khz', name: '千赫兹', factor: 1e3 },
      { id: 'mhz', name: '兆赫兹', factor: 1e6 },
      { id: 'ghz', name: '吉赫兹', factor: 1e9 },
      { id: 'thz', name: '太赫兹', factor: 1e12 },
    ],
  },
  force: {
    units: [
      { id: 'n', name: '牛顿', factor: 1 },
      { id: 'kn', name: '千牛', factor: 1000 },
      { id: 'dyn', name: '达因', factor: 0.00001 },
      { id: 'lbf', name: '磅力', factor: 4.44822 },
      { id: 'kgf', name: '千克力', factor: 9.80665 },
    ],
  },
  torque: {
    units: [
      { id: 'nm', name: '牛·米', factor: 1 },
      { id: 'lbft', name: '磅力·英尺', factor: 1.35582 },
      { id: 'kgfm', name: '千克力·米', factor: 9.80665 },
    ],
  },
  charge: {
    units: [
      { id: 'c', name: '库仑', factor: 1 },
      { id: 'mc', name: '毫库', factor: 0.001 },
      { id: 'uc', name: '微库', factor: 1e-6 },
      { id: 'nc', name: '纳库', factor: 1e-9 },
      { id: 'ah', name: '安时', factor: 3600 },
    ],
  },
  capacitance: {
    units: [
      { id: 'f', name: '法拉', factor: 1 },
      { id: 'mf', name: '毫法', factor: 0.001 },
      { id: 'uf', name: '微法', factor: 1e-6 },
      { id: 'nf', name: '纳法', factor: 1e-9 },
      { id: 'pf', name: '皮法', factor: 1e-12 },
    ],
  },
  resistance: {
    units: [
      { id: 'ohm', name: '欧姆', factor: 1 },
      { id: 'kohm', name: '千欧', factor: 1000 },
      { id: 'mohm', name: '兆欧', factor: 1e6 },
      { id: 'mohm2', name: '毫欧', factor: 0.001 },
    ],
  },
  current: {
    units: [
      { id: 'a', name: '安培', factor: 1 },
      { id: 'ma', name: '毫安', factor: 0.001 },
      { id: 'ua', name: '微安', factor: 1e-6 },
      { id: 'ka', name: '千安', factor: 1000 },
    ],
  },
  voltage: {
    units: [
      { id: 'v', name: '伏特', factor: 1 },
      { id: 'mv', name: '毫伏', factor: 0.001 },
      { id: 'kv', name: '千伏', factor: 1000 },
      { id: 'gv', name: '吉伏', factor: 1e9 },
    ],
  },
  bandwidth: {
    units: [
      { id: 'bps', name: 'bps', factor: 1 },
      { id: 'kbps', name: 'Kbps', factor: 1000 },
      { id: 'mbps', name: 'Mbps', factor: 1e6 },
      { id: 'gbps', name: 'Gbps', factor: 1e9 },
      { id: 'tbps', name: 'Tbps', factor: 1e12 },
    ],
  },
  fuel: {
    units: [
      { id: 'l100', name: '升/100公里', factor: 1 },
      { id: 'mpg_us', name: '英里/加仑(美)', factor: null },
      { id: 'mpg_uk', name: '英里/加仑(英)', factor: null },
      { id: 'kpl', name: '公里/升', factor: null },
    ],
  },
  fontSize: {
    units: [
      { id: 'px', name: '像素(px)', factor: 1 },
      { id: 'pt', name: '点(pt)', factor: 96 / 72 },
      { id: 'em', name: 'em', factor: 16 },
      { id: 'rem', name: 'rem', factor: 16 },
      { id: 'mm', name: '毫米', factor: 96 / 25.4 },
    ],
  },
}

export function toBase(value, unitId, group) {
  const unit = group.units.find(u => u.id === unitId)
  if (!unit || unit.factor == null) return null
  return value * unit.factor
}

export function fromBase(base, unitId, group) {
  const unit = group.units.find(u => u.id === unitId)
  if (!unit || unit.factor == null) return null
  return base / unit.factor
}

export function convertTemp(value, from, to) {
  let c = value
  if (from === 'f') c = (value - 32) * 5 / 9
  else if (from === 'k') c = value - 273.15
  if (to === 'c') return c
  if (to === 'f') return c * 9 / 5 + 32
  if (to === 'k') return c + 273.15
  return c
}

export function convertFuel(value, from, to) {
  if (from === to) return value
  let l100 = value
  if (from === 'mpg_us') l100 = 235.215 / value
  else if (from === 'mpg_uk') l100 = 282.481 / value
  else if (from === 'kpl') l100 = 100 / value
  if (to === 'l100') return l100
  if (to === 'mpg_us') return 235.215 / l100
  if (to === 'mpg_uk') return 282.481 / l100
  if (to === 'kpl') return 100 / l100
  return l100
}

export function convertUnit(value, fromId, toId, groupKey) {
  const group = UNIT_GROUPS[groupKey]
  if (!group) throw new Error('未知单位组')
  const num = Number(value)
  if (isNaN(num)) throw new Error('请输入有效数字')

  if (groupKey === 'temperature') return convertTemp(num, fromId, toId)
  if (groupKey === 'fuel') return convertFuel(num, fromId, toId)

  const base = toBase(num, fromId, group)
  if (base == null) throw new Error('不支持的单位转换')
  const result = fromBase(base, toId, group)
  if (result == null) throw new Error('不支持的单位转换')
  return result
}

export function numberToRmbUpper(n) {
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const units = ['', '拾', '佰', '仟']
  const bigUnits = ['', '万', '亿']
  if (isNaN(n) || n < 0) throw new Error('无效金额')
  if (n === 0) return '零元整'
  const [intPart, decPart = ''] = n.toFixed(2).split('.')
  let result = ''
  const intStr = intPart.replace(/^0+/, '') || '0'
  let zero = false
  for (let i = 0; i < intStr.length; i++) {
    const d = +intStr[i]
    const pos = intStr.length - 1 - i
    const u = units[pos % 4]
    const bu = pos % 4 === 0 ? bigUnits[Math.floor(pos / 4)] : ''
    if (d === 0) { zero = true; if (bu) { result += bu; zero = false } }
    else { if (zero) { result += '零'; zero = false } result += digits[d] + u + bu }
  }
  result += '元'
  const j = +decPart[0] || 0, f = +decPart[1] || 0
  if (j === 0 && f === 0) result += '整'
  else {
    if (j) result += digits[j] + '角'
    if (f) result += digits[f] + '分'
  }
  return result
}

export function calcBloodType(father, mother) {
  const rules = {
    'A+A': ['A', 'O'], 'A+B': ['A', 'B', 'AB', 'O'], 'A+AB': ['A', 'B', 'AB'],
    'A+O': ['A', 'O'], 'B+B': ['B', 'O'], 'B+AB': ['A', 'B', 'AB'],
    'B+O': ['B', 'O'], 'AB+AB': ['A', 'B', 'AB'], 'AB+O': ['A', 'B'],
    'O+O': ['O'],
  }
  const key = `${father}+${mother}`
  return rules[key] || rules[`${mother}+${father}`] || ['无法确定']
}

export function remToPx(rem, base = 16) { return rem * base }
export function pxToRem(px, base = 16) { return px / base }

export const SHOE_SIZE = {
  male: { cn: [38, 39, 40, 41, 42, 43, 44, 45], us: [6, 6.5, 7, 8, 8.5, 9.5, 10, 11], eu: [38, 39, 40, 41, 42, 43, 44, 45], uk: [5, 5.5, 6, 7, 7.5, 8.5, 9, 10] },
  female: { cn: [35, 36, 37, 38, 39, 40], us: [5, 5.5, 6, 7, 8, 9], eu: [35, 36, 37, 38, 39, 40], uk: [3, 3.5, 4, 5, 6, 7] },
}

export const CURRENCY_RATES = {
  CNY: 1, USD: 0.138, EUR: 0.128, GBP: 0.109, JPY: 21.5, HKD: 1.08,
  KRW: 189, AUD: 0.215, CAD: 0.192, SGD: 0.186, THB: 4.85,
}
