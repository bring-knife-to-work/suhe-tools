import { unitTools } from './unitTools'
import { lifeTools } from './lifeTools'
import { imageTools } from './imageTools'
import { mediaTools } from './mediaTools'
import { textTools } from './textTools'
import { encodeTools } from './encodeTools'
import { docTools } from './docTools'
import { webmasterTools } from './webmasterTools'

export const codeTools = [
  { id: 'json-formatter', name: 'JSON格式化/压缩', desc: 'JSON智能美化与无损压缩，高亮显示+自动校验', icon: 'logo-json.svg', category: 'code', type: 'code' },
  { id: 'css-formatter', name: 'CSS代码格式化/压缩', desc: '智能美化/极致压缩，双模式秒级转换', icon: 'logo-css3.svg', category: 'code', type: 'code' },
  { id: 'html-formatter', name: 'HTML代码美化/压缩', desc: '实时解析/智能排版，HTML5全语法支持', icon: 'logo-html.svg', category: 'code', type: 'code' },
  { id: 'sql-format', name: 'SQL格式化/压缩', desc: '一键SQL美化与压缩，多库语法兼容', icon: 'logo-sql.svg', category: 'code', type: 'code' },
  { id: 'yaml-formatter', name: 'YAML格式化', desc: '实时解析格式化校验 YAML 文件', icon: 'logo-yaml-formatter.svg', category: 'code', type: 'code' },
  { id: 'timestamp', name: 'Unix时间戳转换', desc: '时间戳与标准时间双向转换，支持秒级毫秒级', icon: 'logo-timestamp.svg', category: 'code', type: 'code' },
  { id: 'timestamp-batch', name: '时间戳批量转换', desc: '批量转换时间戳，自定义日期格式', icon: 'logo-timestamp-batch.svg', category: 'code', type: 'code' },
  { id: 'datetime-converter', name: '日期时间格式转换', desc: '多种日期时间格式快速统一转换', icon: 'logo-datetime-converter.svg', category: 'code', type: 'code' },
  { id: 'camel', name: '下划线&驼峰命名互换', desc: '驼峰与下划线互转，多格式适配', icon: 'logo-camel.svg', category: 'code', type: 'code' },
  { id: 'hex-converter', name: '进制转换器', desc: '二/八/十/十六进制相互转换', icon: 'logo-binary.svg', category: 'code', type: 'code' },
  { id: 'html-escape', name: 'HTML字符转义', desc: '特殊字符与实体编码双向互转', icon: 'logo-html-escape.svg', category: 'code', type: 'code' },
  { id: 'html-filter', name: 'HTML代码过滤', desc: '批量净化 HTML 标签、JS、CSS', icon: 'logo-html-filter.svg', category: 'code', type: 'code' },
  { id: 'image-extract', name: 'HTML图片链接提取', desc: '提取并去重 HTML 中的图片链接', icon: 'logo-image-extract.svg', category: 'code', type: 'code' },
  { id: 'json-flatten', name: 'JSON数据扁平化', desc: '嵌套 JSON 扁平化为单层键值对', icon: 'logo-json-flatten.svg', category: 'code', type: 'code' },
  { id: 'json-unflatten', name: 'JSON数据反扁平化', desc: '扁平 JSON 还原为标准嵌套结构', icon: 'logo-json-unflatten.svg', category: 'code', type: 'code' },
  { id: 'json-sort', name: 'JSON键名排序', desc: '一键排序 JSON 键名', icon: 'logo-json-sort.svg', category: 'code', type: 'code' },
  { id: 'json-csv', name: 'JSON转CSV', desc: 'JSON 数据转为标准 CSV 格式', icon: 'logo-json-csv.svg', category: 'code', type: 'code' },
  { id: 'csv-json', name: 'CSV转JSON', desc: 'CSV 数据转为标准 JSON 格式', icon: 'logo-csv-json.svg', category: 'code', type: 'code' },
  { id: 'json-yaml', name: 'JSON转YAML', desc: 'JSON 转为标准 YAML 格式', icon: 'logo-json-yaml.svg', category: 'code', type: 'code' },
  { id: 'yaml-json', name: 'YAML转JSON', desc: 'YAML 转为标准 JSON 格式', icon: 'logo-yaml-json.svg', category: 'code', type: 'code' },
  { id: 'json-xml', name: 'JSON转XML', desc: 'JSON 转为标准 XML 格式', icon: 'logo-json-xml.svg', category: 'code', type: 'code' },
  { id: 'xml-json', name: 'XML转JSON', desc: 'XML 转为标准 JSON 格式', icon: 'logo-xml-json.svg', category: 'code', type: 'code' },
  { id: 'json-excel', name: 'JSON转EXCEL', desc: 'JSON 数据生成 Excel 表格文件', icon: 'logo-json-excel.svg', category: 'code', type: 'code' },
  { id: 'excel-json', name: 'EXCEL转JSON', desc: '解析 Excel 文件转为 JSON', icon: 'logo-excel-json.svg', category: 'code', type: 'code' },
  { id: 'php-serialize', name: 'PHP序列化/反序列化', desc: 'PHP serialize 与 JSON 双向转换', icon: 'logo-php-serialize.svg', category: 'code', type: 'code' },
  { id: 'pwa-manifest', name: 'PWA 可视化配置', desc: '可视化配置 PWA Manifest 文件', icon: 'logo-pwa-manifest.svg', category: 'code', type: 'code' },
  { id: 'screen-inspector', name: '屏幕参数查看器', desc: '实时采集屏幕与视口参数', icon: 'logo-screen-inspector.svg', category: 'code', type: 'code' },
  { id: 'button-css', name: '按钮CSS生成器', desc: '可视化自定义按钮样式并生成 CSS', icon: 'logo-button-css.svg', category: 'code', type: 'code' },
  { id: 'loading', name: 'CSS页面加载动画', desc: '多种 CSS Loading 动画代码大全', icon: 'logo-loading.svg', category: 'code', type: 'code' },
]

export const tools = [
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

export const categories = [
  { id: 'all', name: '全部工具', icon: '🏠', color: '#6366f1', desc: '300+ 在线工具一站直达' },
  { id: 'code', name: '编程开发', icon: '💻', color: '#6366f1', desc: 'JSON、代码格式化与开发辅助' },
  { id: 'unit', name: '单位转换', icon: '📐', color: '#10b981', desc: '长度、重量、温度等单位换算' },
  { id: 'life', name: '便民工具', icon: '🏡', color: '#f59e0b', desc: '计算器、倒计时与生活实用' },
  { id: 'image', name: '图像处理', icon: '🖼️', color: '#ec4899', desc: '图片编辑、微信模拟与二维码' },
  { id: 'media', name: '音频视频', icon: '🎬', color: '#06b6d4', desc: '录音、播放与多媒体处理' },
  { id: 'text', name: '文本处理', icon: '📝', color: '#8b5cf6', desc: '字数统计、简繁转换与文本工具' },
  { id: 'encode', name: '编码加密', icon: '🔐', color: '#14b8a6', desc: 'Base64、MD5、哈希与加解密' },
  { id: 'doc', name: '文档处理', icon: '📄', color: '#ef4444', desc: 'PDF、ZIP 与文档格式转换' },
  { id: 'webmaster', name: '站长工具', icon: '🌐', color: '#0ea5e9', desc: 'SEO、DNS 与网站运维工具' },
]

export function getToolById(id) {
  return tools.find(t => t.id === id)
}

export function getToolsByCategory(catId) {
  if (catId === 'all') return tools
  return tools.filter(t => t.category === catId)
}
