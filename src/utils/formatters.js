import { format as sqlFormat } from 'sql-formatter'

export function formatJson(text, indent = 2) {
  return JSON.stringify(JSON.parse(text), null, indent)
}

export function minifyJson(text) {
  return JSON.stringify(JSON.parse(text))
}

export function formatCss(text) {
  let result = ''
  let indent = 0
  const lines = text.replace(/\s+/g, ' ').replace(/\s*{\s*/g, ' {\n').replace(/\s*}\s*/g, '\n}\n').replace(/\s*;\s*/g, ';\n').replace(/\s*,\s*/g, ', ')
  for (const line of lines.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (trimmed.includes('}')) indent = Math.max(0, indent - 1)
    result += '  '.repeat(indent) + trimmed + '\n'
    if (trimmed.includes('{')) indent++
  }
  return result.trim()
}

export function minifyCss(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').trim()
}

export function formatHtml(text) {
  let result = ''
  let indent = 0
  const formatted = text.replace(/>\s*</g, '>\n<').replace(/\s+/g, ' ')
  for (const line of formatted.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (trimmed.startsWith('</')) indent = Math.max(0, indent - 1)
    result += '  '.repeat(indent) + trimmed + '\n'
    if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !trimmed.includes('</')) {
      const tag = trimmed.match(/<(\w+)/)
      if (tag && !['meta', 'link', 'img', 'br', 'hr', 'input'].includes(tag[1])) indent++
    }
  }
  return result.trim()
}

export function minifyHtml(text) {
  return text.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim()
}

export function formatSql(text) {
  return sqlFormat(text, { language: 'sql' })
}

export function minifySql(text) {
  return text.replace(/\s+/g, ' ').replace(/\s*([,;()])\s*/g, '$1').trim()
}

export function sortJsonKeys(obj) {
  if (Array.isArray(obj)) return obj.map(sortJsonKeys)
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = sortJsonKeys(obj[key])
      return acc
    }, {})
  }
  return obj
}

export function flattenJson(obj, prefix = '', result = {}) {
  for (const key of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    const val = obj[key]
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      flattenJson(val, path, result)
    } else {
      result[path] = val
    }
  }
  return result
}

export function unflattenJson(obj) {
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split('.')
    let current = result
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {}
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value
  }
  return result
}

export function toCamelCase(str) {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()).replace(/^./, c => c.toLowerCase())
}

export function toSnakeCase(str) {
  return str.replace(/([A-Z])/g, '_$1').replace(/[-\s]+/g, '_').toLowerCase().replace(/^_/, '')
}

export function toPascalCase(str) {
  const camel = toCamelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

export function toKebabCase(str) {
  return str.replace(/([A-Z])/g, '-$1').replace(/[_\s]+/g, '-').toLowerCase().replace(/^-/, '')
}

export function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return text.replace(/[&<>"']/g, c => map[c])
}

export function unescapeHtml(text) {
  const map = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'" }
  return text.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, m => map[m] || m)
}

export function filterHtml(html, options = { tags: true, scripts: true, styles: true }) {
  let result = html
  if (options.scripts) result = result.replace(/<script[\s\S]*?<\/script>/gi, '')
  if (options.styles) result = result.replace(/<style[\s\S]*?<\/style>/gi, '')
  if (options.tags) result = result.replace(/<[^>]+>/g, '')
  return result.replace(/\s+/g, ' ').trim()
}

export function extractImages(html) {
  const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi
  const urls = new Set()
  let match
  while ((match = regex.exec(html)) !== null) urls.add(match[1])
  return [...urls]
}
