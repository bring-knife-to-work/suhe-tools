/**
 * 为缺少专属图标的工具生成 logo-{id}.svg
 * 运行: node scripts/generate-tool-logos.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { unitTools } from '../src/data/unitTools.js'
import { lifeTools } from '../src/data/lifeTools.js'
import { imageTools } from '../src/data/imageTools.js'
import { mediaTools } from '../src/data/mediaTools.js'
import { textTools } from '../src/data/textTools.js'
import { encodeTools } from '../src/data/encodeTools.js'
import { docTools } from '../src/data/docTools.js'
import { webmasterTools } from '../src/data/webmasterTools.js'

// codeTools 定义在 tools.js 中，单独列出避免循环依赖
const codeTools = [
  { id: 'json-formatter', name: 'JSON格式化/压缩', category: 'code', icon: 'logo-json.svg' },
  { id: 'css-formatter', name: 'CSS代码格式化/压缩', category: 'code', icon: 'logo-css3.svg' },
  { id: 'html-formatter', name: 'HTML代码美化/压缩', category: 'code', icon: 'logo-html.svg' },
  { id: 'sql-format', name: 'SQL格式化/压缩', category: 'code', icon: 'logo-sql.svg' },
  { id: 'yaml-formatter', name: 'YAML格式化', category: 'code', icon: 'logo-yaml-formatter.svg' },
  { id: 'timestamp', name: 'Unix时间戳转换', category: 'code', icon: 'logo-timestamp.svg' },
  { id: 'timestamp-batch', name: '时间戳批量转换', category: 'code', icon: 'logo-timestamp-batch.svg' },
  { id: 'datetime-converter', name: '日期时间格式转换', category: 'code', icon: 'logo-datetime-converter.svg' },
  { id: 'camel', name: '下划线&驼峰命名互换', category: 'code', icon: 'logo-camel.svg' },
  { id: 'hex-converter', name: '进制转换器', category: 'code', icon: 'logo-binary.svg' },
  { id: 'html-escape', name: 'HTML字符转义', category: 'code', icon: 'logo-html-escape.svg' },
  { id: 'html-filter', name: 'HTML代码过滤', category: 'code', icon: 'logo-html-filter.svg' },
  { id: 'image-extract', name: 'HTML图片链接提取', category: 'code', icon: 'logo-image-extract.svg' },
  { id: 'json-flatten', name: 'JSON数据扁平化', category: 'code', icon: 'logo-json-flatten.svg' },
  { id: 'json-unflatten', name: 'JSON数据反扁平化', category: 'code', icon: 'logo-json-unflatten.svg' },
  { id: 'json-sort', name: 'JSON键名排序', category: 'code', icon: 'logo-json-sort.svg' },
  { id: 'json-csv', name: 'JSON转CSV', category: 'code', icon: 'logo-json-csv.svg' },
  { id: 'csv-json', name: 'CSV转JSON', category: 'code', icon: 'logo-csv-json.svg' },
  { id: 'json-yaml', name: 'JSON转YAML', category: 'code', icon: 'logo-json-yaml.svg' },
  { id: 'yaml-json', name: 'YAML转JSON', category: 'code', icon: 'logo-yaml-json.svg' },
  { id: 'json-xml', name: 'JSON转XML', category: 'code', icon: 'logo-json-xml.svg' },
  { id: 'xml-json', name: 'XML转JSON', category: 'code', icon: 'logo-xml-json.svg' },
  { id: 'json-excel', name: 'JSON转EXCEL', category: 'code', icon: 'logo-json-excel.svg' },
  { id: 'excel-json', name: 'EXCEL转JSON', category: 'code', icon: 'logo-excel-json.svg' },
  { id: 'php-serialize', name: 'PHP序列化/反序列化', category: 'code', icon: 'logo-php-serialize.svg' },
  { id: 'pwa-manifest', name: 'PWA 可视化配置', category: 'code', icon: 'logo-pwa-manifest.svg' },
  { id: 'screen-inspector', name: '屏幕参数查看器', category: 'code', icon: 'logo-screen-inspector.svg' },
  { id: 'button-css', name: '按钮CSS生成器', category: 'code', icon: 'logo-button-css.svg' },
  { id: 'loading', name: 'CSS页面加载动画', category: 'code', icon: 'logo-loading.svg' },
]

const categories = [
  { id: 'code', color: '#6366f1' },
  { id: 'unit', color: '#10b981' },
  { id: 'life', color: '#f59e0b' },
  { id: 'image', color: '#ec4899' },
  { id: 'media', color: '#06b6d4' },
  { id: 'text', color: '#8b5cf6' },
  { id: 'encode', color: '#14b8a6' },
  { id: 'doc', color: '#ef4444' },
  { id: 'webmaster', color: '#0ea5e9' },
]

const rawTools = [
  ...codeTools,
  ...unitTools,
  ...lifeTools,
  ...imageTools,
  ...mediaTools,
  ...textTools,
  ...encodeTools,
  ...docTools,
  ...webmasterTools,
]

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logosDir = path.join(__dirname, '../public/logos')

const catColors = Object.fromEntries(
  categories.filter(c => c.id !== 'all').map(c => [c.id, c.color]),
)

/** 20×20 线框图标（Lucide 风格简化路径） */
const GLYPHS = {
  image: '<rect x="3" y="3" width="14" height="14" rx="2"/><circle cx="8" cy="8" r="1.5" fill="#fff" stroke="none"/><path d="M3 14l4-4 3 3 2-2 5 5"/>',
  crop: '<path d="M6 2v4H2M14 18v4h4M18 6h4v4M2 14h4v4"/><rect x="7" y="7" width="6" height="6" rx="1"/>',
  rotate: '<path d="M14 4a6 6 0 1 1-4 10"/><path d="M14 2v4h-4"/>',
  flip: '<path d="M10 3v14M3 10h14"/><path d="M7 7l-3 3 3 3M13 7l3 3-3 3"/>',
  blur: '<circle cx="10" cy="10" r="6" opacity="0.5"/><circle cx="10" cy="10" r="3"/>',
  adjust: '<circle cx="10" cy="10" r="3"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2"/>',
  filter: '<path d="M3 4h14l-5 6v6l-4 2V10L3 4z"/>',
  qrcode: '<rect x="3" y="3" width="6" height="6"/><rect x="11" y="3" width="6" height="6"/><rect x="3" y="11" width="6" height="6"/><path d="M13 13h2v2h-2zM15 15h2v2h-2zM11 15h2v2h-2z"/>',
  barcode: '<path d="M3 5h2v10H3zM7 5h1v10H7zM10 5h2v10h-2zM14 5h1v10h-1zM17 5h2v10h-2z"/>',
  wechat: '<path d="M7 16c-3 0-5-2-5-4.5S4 7 7 7s5 2 5 4.5-2 4.5-5 4.5zM13 13c2.5 0 4.5-1.5 4.5-3.5S15.5 6 13 6"/><circle cx="5.5" cy="10.5" r="0.8" fill="#fff" stroke="none"/><circle cx="8.5" cy="10.5" r="0.8" fill="#fff" stroke="none"/>',
  wallet: '<rect x="3" y="6" width="14" height="10" rx="2"/><path d="M3 9h14"/><circle cx="14" cy="11" r="1" fill="#fff" stroke="none"/>',
  ocr: '<path d="M4 5h12v10H4z"/><path d="M7 9h6M7 12h4"/>',
  compress: '<path d="M14 6l-4 4 4 4M6 6l4 4-4 4"/>',
  grid: '<rect x="3" y="3" width="6" height="6"/><rect x="11" y="3" width="6" height="6"/><rect x="3" y="11" width="6" height="6"/><rect x="11" y="11" width="6" height="6"/>',
  palette: '<circle cx="10" cy="10" r="7"/><circle cx="7" cy="8" r="1.2" fill="#fff" stroke="none"/><circle cx="13" cy="8" r="1.2" fill="#fff" stroke="none"/><circle cx="10" cy="13" r="1.2" fill="#fff" stroke="none"/>',
  watermark: '<path d="M4 14l4-8 3 5 2-3 3 6"/><path d="M3 17h14"/>',
  format: '<rect x="4" y="3" width="12" height="14" rx="2"/><path d="M8 7h4M8 10h4M8 13h2"/>',
  svg: '<path d="M5 5l5 10 2-4 3 4"/><path d="M3 17h14"/>',
  gif: '<rect x="3" y="5" width="14" height="10" rx="2"/><path d="M7 8v4M7 10h2a1 1 0 1 0 0-2H7"/>',
  font: '<path d="M6 16V6h8M10 6v10M6 12h8"/>',
  cutout: '<path d="M8 4c4 0 6 3 6 6s-2 6-6 6"/><path d="M4 14l3-3"/>',
  clock: '<circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2"/>',
  countdown: '<circle cx="10" cy="11" r="7"/><path d="M10 7v4l2.5 2.5M10 3V2M14 4l1-1"/>',
  calendar: '<rect x="3" y="5" width="14" height="12" rx="2"/><path d="M3 9h14M7 3v4M13 3v4"/>',
  calculator: '<rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h2M11 10h2M7 13h2M11 13h2"/>',
  checklist: '<rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7l2 2 4-4M7 12h6M7 15h4"/>',
  speaker: '<path d="M4 8h3l4-3v10l-4-3H4z"/><path d="M14 7a3 3 0 0 1 0 6M16 5a5 5 0 0 1 0 10"/>',
  monitor: '<rect x="2" y="4" width="16" height="10" rx="2"/><path d="M8 17h4M10 14v3"/>',
  car: '<path d="M4 12h12l-1-4H5l-1 4z"/><circle cx="6.5" cy="14" r="1.5"/><circle cx="13.5" cy="14" r="1.5"/>',
  quote: '<path d="M6 8a2 2 0 0 0-2 2v4h4v-4H6zM14 8a2 2 0 0 0-2 2v4h4v-4h-4z"/>',
  wifi: '<path d="M2 8c5-4 11-4 16 0M5 11c3.5-2.5 6.5-2.5 10 0M8 14c2-1.5 2-1.5 4 0"/><circle cx="10" cy="17" r="1" fill="#fff" stroke="none"/>',
  stopwatch: '<circle cx="11" cy="11" r="7"/><path d="M11 7v4l2.5 2.5M11 3h0M9 2h4"/>',
  bell: '<path d="M10 3a3 3 0 0 1 3 3v2l2 2v5H5v-5l2-2V6a3 3 0 0 1 3-3z"/><path d="M8 17a2 2 0 0 0 4 0"/>',
  mouse: '<rect x="7" y="3" width="6" height="10" rx="3"/><path d="M10 6v2"/>',
  keyboard: '<rect x="2" y="6" width="16" height="9" rx="2"/><path d="M5 9h2M9 9h2M13 9h2M5 12h10"/>',
  eye: '<path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z"/><circle cx="10" cy="10" r="2"/>',
  user: '<circle cx="10" cy="7" r="3"/><path d="M4 17c0-3 2.5-5 6-5s6 2 6 5"/>',
  users: '<circle cx="7" cy="8" r="2.5"/><circle cx="14" cy="9" r="2"/><path d="M3 16c0-2 2-3.5 4-3.5M13 16c0-1.5 1.5-2.5 3-2.5"/>',
  fileText: '<path d="M6 3h6l4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M12 3v4h4M8 11h4M8 14h4"/>',
  scroll: '<path d="M6 3h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M8 8h4M8 11h4M8 14h2"/>',
  chart: '<path d="M4 15V8M8 15V5M12 15v-3M16 15V6"/>',
  star: '<path d="M10 3l2 4 4.5.7-3.2 3.2.8 4.6L10 13.5 5.9 15.5l.8-4.6L3.5 7.7 8 7z"/>',
  hash: '<path d="M6 4l-1.5 12M14 4l-1.5 12M4 8h12M3 14h12"/>',
  idCard: '<rect x="3" y="5" width="14" height="10" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M12 9h4M12 12h3"/>',
  coin: '<circle cx="10" cy="10" r="7"/><path d="M10 6v8M7 8.5h6M7 11.5h6"/>',
  shuffle: '<path d="M14 4l3 3-3 3M3 7h11M6 13l-3 3 3 3M17 13H6"/>',
  phone: '<rect x="6" y="3" width="8" height="14" rx="2"/><path d="M9 15h2"/>',
  receipt: '<path d="M6 3h8v14l-2-1.5L10 17l-2-1.5L6 17V3z"/><path d="M8 7h4M8 10h4"/>',
  heart: '<path d="M10 16s-6-3.5-6-8a3.5 3.5 0 0 1 6-2 3.5 3.5 0 0 1 6 2c0 4.5-6 8-6 8z"/>',
  message: '<path d="M4 5h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-4 3V7a2 2 0 0 1 2-2z"/>',
  map: '<path d="M4 4l5-2 5 2 5-2v14l-5 2-5-2-5 2V4z"/><path d="M9 2v14M14 4v14"/>',
  mail: '<rect x="3" y="5" width="14" height="10" rx="2"/><path d="M3 7l7 5 7-5"/>',
  graduation: '<path d="M3 9l7-4 7 4-7 4-7-4z"/><path d="M6 11v3c0 1 2.5 2 4 2s4-1 4-2v-3"/>',
  text: '<path d="M5 5h10M10 5v11M7 16h6"/>',
  type: '<path d="M6 16V6h8M10 6v10"/>',
  replace: '<path d="M4 7h8l-2-2M16 13H8l2 2"/>',
  emoji: '<circle cx="10" cy="10" r="7"/><path d="M7 9h0M13 9h0M7 13c1 1.5 5 1.5 6 0"/>',
  random: '<rect x="3" y="3" width="14" height="14" rx="2"/><circle cx="8" cy="8" r="1" fill="#fff" stroke="none"/><circle cx="13" cy="13" r="1" fill="#fff" stroke="none"/><circle cx="13" cy="7" r="1" fill="#fff" stroke="none"/>',
  sum: '<path d="M5 5h10M5 10h7M5 15h10"/><path d="M14 13l2 2-2 2"/>',
  extract: '<path d="M4 4h12v12H4z"/><path d="M8 8h4M8 11h2"/>',
  link: '<path d="M8 10a3 3 0 0 0 4 0l2-2a3 3 0 0 0-4-4l-1 1M12 10a3 3 0 0 0-4 0l-2 2a3 3 0 0 0 4 4l1-1"/>',
  split: '<path d="M10 3v14M4 7h4M16 7h-4M4 13h4M16 13h-4"/>',
  stats: '<path d="M4 15V9M8 15V6M12 15v-4M16 15V4"/>',
  sequence: '<path d="M4 7h2M8 7h2M12 7h2M16 7h2M4 12h2M8 12h2M12 12h2M16 12h2"/>',
  notepad: '<rect x="4" y="3" width="12" height="14" rx="2"/><path d="M8 7h4M8 10h4M8 13h4"/>',
  markdown: '<path d="M5 5h3l2 3 2-3h3v10h-3v-6l-2 3-2-3v6H5z"/>',
  shield: '<path d="M10 3l6 2v5c0 4-3 6-6 7-3-1-6-3-6-7V5l6-2z"/>',
  lock: '<rect x="5" y="9" width="10" height="8" rx="2"/><path d="M7 9V7a3 3 0 0 1 6 0v2"/>',
  key: '<circle cx="8" cy="10" r="3"/><path d="M11 10h5l-2 2 2 2"/>',
  binary: '<rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h2v2H7zM11 7h2v2h-2zM7 11h2v2H7zM11 11h2v2h-2z"/>',
  gzip: '<path d="M10 3v14M6 7h8M6 11h8M6 15h5"/>',
  jwt: '<rect x="3" y="6" width="14" height="8" rx="2"/><path d="M6 10h2M10 10h4"/>',
  morse: '<path d="M4 10h2v0M8 10h6M4 14h8"/>',
  steganography: '<rect x="3" y="3" width="14" height="14" rx="2"/><path d="M6 12l2-3 2 2 3-4"/>',
  zip: '<path d="M8 3h4v3H8zM8 8h4M8 10h4M8 12h4"/><rect x="5" y="3" width="10" height="14" rx="2"/>',
  pdf: '<path d="M6 3h6l4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M12 3v4h4M8 11h4"/>',
  excel: '<rect x="3" y="3" width="14" height="14" rx="2"/><path d="M3 8h14M8 3v14"/>',
  contact: '<circle cx="10" cy="7" r="2.5"/><path d="M4 16c0-2.5 2.5-4 6-4s6 1.5 6 4"/><path d="M14 5h3v3"/>',
  globe: '<circle cx="10" cy="10" r="7"/><path d="M3 10h14M10 3c2 3 2 11 0 14M10 3c-2 3-2 11 0 14"/>',
  browser: '<circle cx="10" cy="10" r="7"/><path d="M3 10h14M10 3a10 10 0 0 1 0 14"/>',
  ip: '<rect x="3" y="5" width="14" height="10" rx="2"/><path d="M6 9h8M6 12h5"/>',
  dns: '<circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2"/><path d="M6 6h8"/>',
  seo: '<path d="M4 14l4-8 3 5 2-3 3 6"/>',
  robot: '<rect x="5" y="7" width="10" height="8" rx="2"/><circle cx="8" cy="11" r="1" fill="#fff" stroke="none"/><circle cx="12" cy="11" r="1" fill="#fff" stroke="none"/><path d="M10 4v3"/>',
  regex: '<path d="M6 6l-2 4 2 4M14 6l2 4-2 4M11 6l-2 8"/>',
  color: '<circle cx="10" cy="10" r="7"/><path d="M10 3v14"/>',
  ratio: '<rect x="3" y="6" width="8" height="8" rx="1"/><rect x="13" y="9" width="4" height="5" rx="1"/>',
  network: '<circle cx="10" cy="5" r="2"/><circle cx="5" cy="15" r="2"/><circle cx="15" cy="15" r="2"/><path d="M10 7v3M8.5 12L6 13M11.5 12l2.5 1"/>',
  scan: '<path d="M4 7V4h3M16 4h3v3M4 13v3h3M16 16h3v-3"/><rect x="7" y="7" width="6" height="6" rx="1"/>',
  log: '<path d="M5 4h10v12H5z"/><path d="M8 8h4M8 11h4M8 14h2"/>',
  ssl: '<path d="M10 3l6 2v5c0 4-3 6-6 7-3-1-6-3-6-7V5l6-2z"/><path d="M8 10l2 2 3-3"/>',
  audio: '<path d="M8 5v10M8 10l4-2v4l-4-2z"/><path d="M4 14h12"/>',
  video: '<rect x="3" y="5" width="14" height="10" rx="2"/><path d="M9 8l4 2-4 2z"/>',
  mic: '<rect x="8" y="4" width="4" height="7" rx="2"/><path d="M6 10a4 4 0 0 0 8 0M10 14v2"/>',
  speech: '<path d="M4 8h2v4H4zM8 6h2v8H8zM12 8h2v4h-2zM16 10h2v2h-2z"/>',
  record: '<circle cx="10" cy="10" r="7"/><circle cx="10" cy="10" r="3" fill="#fff" stroke="none"/>',
  music: '<path d="M13 5v8a2 2 0 1 1-2-2"/><path d="M13 5l-5 2v6"/>',
  fish: '<ellipse cx="10" cy="10" rx="6" ry="4"/><path d="M4 10l-2 2 2 2"/><circle cx="12" cy="9" r="0.8" fill="#fff" stroke="none"/>',
  tool: '<path d="M14 4l2 2-8 8H6v-2l8-8z"/>',
}

/** 工具 id → 图标类型 */
const TOOL_GLYPH = {
  // life
  'bonus-tax': 'calculator', 'gaokao-countdown': 'countdown', 'todo-list': 'checklist',
  'speaker-clean': 'speaker', 'lunar-calendar': 'calendar', 'fake-upgrade': 'monitor',
  'work-schedule': 'calendar', 'car-loan': 'car', 'holiday-2026': 'calendar',
  'time-singapore': 'clock', 'qingming-countdown': 'countdown', 'loan-interest': 'calculator',
  'time-tokyo': 'clock', 'time-seoul': 'clock', 'quotes': 'quote', 'wifi-qrcode': 'wifi',
  'stopwatch': 'stopwatch', 'festival-countdown': 'countdown', 'wechat-multi': 'wechat',
  'mouse-test': 'mouse', 'work-alarm': 'bell', 'colorblind-test': 'eye',
  'retirement-age': 'user', 'date-diff': 'calendar', 'loan-calculator': 'calculator',
  'time-beijing': 'clock', 'world-time': 'globe', 'keyboard-test': 'keyboard',
  'first-aid-kit': 'shield', 'baby-name': 'user', 'resignation-letter': 'fileText',
  'funny-group-names': 'users', 'led-marquee': 'scroll', 'baby-height': 'chart',
  'birth-info': 'star', 'wooden-fish': 'fish', 'uuid-generator': 'hash',
  'id-card': 'idCard', 'coin-flip': 'coin', 'random-pick': 'shuffle',
  'phone-location': 'phone', 'phone-dedup': 'phone', 'phone-mask': 'phone',
  'payslip': 'receipt', 'love-age': 'heart', 'qq-group-info': 'message',
  'female-speech-decode': 'message', 'china-map': 'map', 'world-map': 'map',
  'email-bulk-sender': 'mail', 'yellow-pages-114': 'phone', 'university-list': 'graduation',
  // image
  'img-resize': 'image', 'img-crop': 'crop', 'img-rotate': 'rotate', 'img-flip': 'flip',
  'img-blur': 'blur', 'img-brightness': 'adjust', 'img-saturation': 'palette',
  'img-grayscale': 'filter', 'img-vintage': 'filter', 'img-ink': 'filter',
  'img-emboss': 'filter', 'img-warmth': 'palette', 'img-highlight': 'adjust',
  'img-negative': 'image', 'img-watermark': 'watermark', 'img-compress': 'compress',
  'img-round': 'image', 'img-grid': 'grid', 'img-nine-grid': 'grid', 'img-filter': 'filter',
  'img-color-picker': 'palette', 'img-placeholder': 'image', 'img-format': 'format',
  'img-heic': 'format', 'qrcode-gen': 'qrcode', 'qrcode-decode': 'qrcode',
  'barcode-gen': 'barcode', 'vcard-qrcode': 'qrcode', 'id-photo': 'crop',
  'img-mosaic': 'grid', 'wechat': 'wechat', 'wechat-pro': 'wechat', 'wechat-group': 'wechat',
  'wechat-moments': 'wechat', 'wechat-wallet': 'wallet', 'moments-marketing-card': 'wechat',
  'ocr': 'ocr', 'screenshot-ocr': 'ocr', 'color-replace': 'palette',
  'watermark-bulk': 'watermark', 'national-avatar': 'image', 'photo-frame': 'image',
  'svg-to-png': 'svg', 'svg-to-jpg': 'svg', 'svg-to-webp': 'svg',
  'jpg-to-webp': 'format', 'png-to-jpg': 'format', 'webp-to-jpg': 'format',
  'heic-batch-convert': 'format', 'batch-resize': 'image', 'quick-resize': 'image',
  'gif-maker': 'gif', 'gif-split': 'gif', 'payment-qrcode-merge': 'qrcode',
  'daily-menu-maker': 'fileText', 'registration-id-photo': 'crop',
  'ecommerce-long-image-cut': 'grid', 'freehand-cutout': 'cutout',
  'perspective-correction': 'crop', 'qrcode-logo-remove': 'qrcode',
  'local-font-viewer': 'font', 'img-to-svg': 'svg', 'svg-editor': 'svg',
  // media
  'audio-recorder': 'mic', 'audio-player': 'music', 'video-player': 'video',
  'text-to-speech': 'speech', 'screen-recorder': 'record', 'audio-convert': 'audio',
  'video-mute': 'video', 'alipay-voice': 'speech', 'video-to-wav': 'audio',
  'flac-to-mp3': 'audio', 'ogg-to-mp3': 'audio', 'mp3-to-wav': 'audio',
  'mp3-to-ogg': 'audio', 'wav-to-mp3': 'audio', 'classic-songs': 'music',
  // text
  'word-count': 'text', 'zh-convert': 'type', 'pinyin': 'type', 'case-convert': 'type',
  'circle-letter': 'type', 'martian-text': 'type', 'text-replace': 'replace',
  'newline-to-text': 'text', 'text-to-newline': 'text', 'emoji-remove': 'emoji',
  'random-string-gen': 'random', 'number-sum': 'sum', 'phone-extract': 'extract',
  'email-extract': 'extract', 'url-extractor': 'link', 'text-split': 'split',
  'line-frequency': 'stats', 'number-sequence': 'sequence', 'notepad': 'notepad',
  'markdown-editor': 'markdown', 'text-extractor': 'extract',
  'idcard-birthday': 'idCard', 'xhs-forbidden-words': 'shield',
  'xianyu-forbidden-words': 'shield', 'douyin-forbidden-words': 'shield',
  'jd-forbidden-words': 'shield', 'pdd-forbidden-words': 'shield',
  'wechat-chat-template': 'wechat', 'text-auto-format': 'text', 'text-file-reader': 'fileText',
  // encode
  'base64-encode': 'binary', 'image-to-base64': 'binary', 'base64-to-image': 'binary',
  'file-to-base64': 'binary', 'base64-to-file': 'binary', 'base64-batch': 'binary',
  'url-encode': 'link', 'html-entity': 'code', 'utf8-encode': 'type',
  'escape-encode': 'type', 'jwt-decode': 'jwt', 'md5': 'lock', 'md5-batch': 'lock',
  'sha-hash': 'lock', 'file-md5': 'lock', 'morse': 'morse', 'base32': 'binary',
  'text-binary': 'binary', 'text-hex': 'binary', 'text-octal': 'binary',
  'random-password': 'key', 'password-entropy': 'shield', 'gzip-encode': 'gzip',
  'url-hex': 'link', 'htpasswd': 'lock', 'aes-encrypt': 'lock', 'des-encrypt': 'lock',
  'js-obfuscate': 'lock', 'mysql-password-hash': 'lock',
  'lsb-steganography': 'steganography', 'lsb-steganography-decode': 'steganography',
  // doc
  'zip-pack': 'zip', 'zip-unpack': 'zip', 'images-to-pdf': 'pdf', 'pdf-merge': 'pdf',
  'pdf-split': 'pdf', 'pdf-compress': 'compress', 'pdf-watermark': 'watermark',
  'pdf-to-images': 'image', 'pdf-to-long-image': 'image', 'pdf-reader': 'pdf',
  'pdf-delete-pages': 'pdf', 'pdf-extract-images': 'image', 'pdf-deduplicate': 'pdf',
  'pdf-add-page-number': 'pdf', 'pdf-rotate-remove': 'rotate', 'pdf-remove-blank': 'pdf',
  'pdf-reverse-pages': 'pdf', 'pdf-crop': 'crop', 'pdf-mirror': 'flip',
  'pdf-scale': 'adjust', 'pdf-book-layout': 'pdf', 'pdf-split-html': 'pdf',
  'pdf-insert-blank': 'pdf', 'word-to-pdf': 'pdf', 'svg-to-pdf': 'svg',
  'csv-to-excel': 'excel', 'excel-to-csv': 'excel', 'vcf-generator': 'contact',
  // webmaster
  'browser-info': 'browser', 'my-ip': 'ip', 'url-parser': 'link',
  'user-agent-list': 'browser', 'view-source': 'code', 'http-status': 'globe',
  'meta-generator': 'seo', 'robots-generator': 'robot', 'regex-generator': 'regex',
  'color-picker-converter': 'color', 'ratio-calculator': 'ratio',
  'ip-int-convert': 'ip', 'cidr-converter': 'network', 'subnet-calculator': 'network',
  'random-ip': 'ip', 'short-url-expand': 'link', 'web-shortcut': 'link',
  'batch-rename': 'fileText', 'baidu-push': 'seo', 'favicon-fetch': 'globe',
  'favicon-generator': 'image', 'keyword-density': 'seo', 'meta-check': 'seo',
  'http-headers': 'globe', 'dead-link-check': 'link', 'dns-lookup': 'dns',
  'whois': 'globe', 'icp-lookup': 'globe', 'gzip-check': 'gzip',
  'friend-link-check': 'link', 'site-index-query': 'seo', 'device-simulator': 'monitor',
  'port-scanner': 'scan', 'sitemap-extract': 'globe', 'robots-check': 'robot',
  'pv-refresh': 'refresh', 'ssl-check': 'ssl', 'log-analyzer': 'log',
  'wechat-group-qrcode': 'qrcode', 'baidu-push-pro': 'seo',
}

// 补充 refresh / code glyph
GLYPHS.refresh = '<path d="M4 10a6 6 0 0 1 10-4M16 10a6 6 0 0 1-10 4"/><path d="M14 4h2v4h-4M6 16H4v-4h4"/>'
GLYPHS.code = '<path d="M7 6l-4 4 4 4M13 6l4 4-4 4M11 4l-2 12"/>'

function pickGlyph(tool) {
  if (TOOL_GLYPH[tool.id]) return TOOL_GLYPH[tool.id]
  const hay = `${tool.id} ${tool.name} ${tool.type || ''}`.toLowerCase()
  const rules = [
    ['qrcode|二维码|barcode|条形码', 'qrcode'],
    ['wechat|微信', 'wechat'],
    ['pdf', 'pdf'],
    ['zip|压缩包', 'zip'],
    ['excel|csv|xlsx', 'excel'],
    ['json|yaml|xml|html|css|sql|code|源码|格式化', 'code'],
    ['image|img|图片|photo|avatar|gif|svg|png|jpg|webp|heic', 'image'],
    ['video|录屏|屏幕', 'video'],
    ['audio|mp3|wav|flac|ogg|录音|音乐|语音', 'audio'],
    ['password|加密|md5|sha|aes|des|hash|jwt', 'lock'],
    ['base64|binary|hex|octal|encode|编码', 'binary'],
    ['url|link|链接', 'link'],
    ['dns|whois|icp|ip|端口|ssl|http|网站|站长|seo|robot|sitemap', 'globe'],
    ['phone|手机|电话', 'phone'],
    ['map|地图', 'map'],
    ['time|clock|倒计时|闹钟|秒表|日历|日期', 'clock'],
    ['loan|tax|计算|calculator', 'calculator'],
    ['text|文本|字数|markdown|替换|拼音', 'text'],
    ['mail|邮件', 'mail'],
    ['ocr|识别', 'ocr'],
  ]
  for (const [pattern, glyph] of rules) {
    if (new RegExp(pattern, 'i').test(hay)) return glyph
  }
  return 'tool'
}

function makeSvg(color, glyphKey) {
  const paths = GLYPHS[glyphKey] || GLYPHS.tool
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none">
  <rect width="28" height="28" rx="6" fill="${color}"/>
  <g transform="translate(4,4)" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none">
    ${paths}
  </g>
</svg>`
}

function needsGeneratedIcon(tool) {
  return !tool.icon || tool.icon === 'logo-default.svg'
}

function main() {
  fs.mkdirSync(logosDir, { recursive: true })
  let created = 0
  let skipped = 0

  for (const tool of rawTools) {
    if (!needsGeneratedIcon(tool)) {
      skipped++
      continue
    }
    const filename = `logo-${tool.id}.svg`
    const filepath = path.join(logosDir, filename)
    const color = catColors[tool.category] || '#6366f1'
    const glyph = pickGlyph(tool)
    fs.writeFileSync(filepath, makeSvg(color, glyph), 'utf8')
    created++
  }

  console.log(`Generated ${created} icons, skipped ${skipped} (already have icons).`)
}

main()
