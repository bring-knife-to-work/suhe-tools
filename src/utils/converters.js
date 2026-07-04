import { dump as yamlDump, load as yamlLoad } from 'js-yaml'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import * as XLSX from 'xlsx'

const xmlParser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })
const xmlBuilder = new XMLBuilder({ ignoreAttributes: false, attributeNamePrefix: '@_', format: true })

export function jsonToYaml(json) {
  return yamlDump(JSON.parse(json), { indent: 2, lineWidth: -1 })
}

export function yamlToJson(yamlText) {
  return JSON.stringify(yamlLoad(yamlText), null, 2)
}

export function formatYaml(yamlText) {
  return yamlDump(yamlLoad(yamlText), { indent: 2, lineWidth: -1 })
}

export function jsonToXml(json) {
  const obj = JSON.parse(json)
  const rootKey = Object.keys(obj)[0] || 'root'
  const wrapped = typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 1
    ? obj
    : { [rootKey]: obj }
  return xmlBuilder.build(wrapped)
}

export function xmlToJson(xml) {
  return JSON.stringify(xmlParser.parse(xml), null, 2)
}

export function jsonToCsv(json) {
  const data = JSON.parse(json)
  const rows = Array.isArray(data) ? data : [data]
  if (!rows.length) return ''
  const headers = [...new Set(rows.flatMap(r => Object.keys(r)))]
  const lines = [headers.join(',')]
  for (const row of rows) {
    lines.push(headers.map(h => {
      const val = row[h] ?? ''
      const str = String(val)
      return str.includes(',') || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str
    }).join(','))
  }
  return lines.join('\n')
}

export function csvToJson(csv) {
  const lines = csv.trim().split('\n')
  if (!lines.length) return '[]'
  const headers = parseCsvLine(lines[0])
  const rows = lines.slice(1).map(line => {
    const values = parseCsvLine(line)
    return headers.reduce((obj, h, i) => { obj[h] = values[i] ?? ''; return obj }, {})
  })
  return JSON.stringify(rows, null, 2)
}

function parseCsvLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { current += '"'; i++ }
      else if (ch === '"') inQuotes = false
      else current += ch
    } else {
      if (ch === '"') inQuotes = true
      else if (ch === ',') { result.push(current); current = '' }
      else current += ch
    }
  }
  result.push(current)
  return result
}

export function jsonToExcel(json) {
  const data = JSON.parse(json)
  const rows = Array.isArray(data) ? data : [data]
  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  return XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
}

export function excelToJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'array' })
        const ws = wb.Sheets[wb.SheetNames[0]]
        resolve(JSON.stringify(XLSX.utils.sheet_to_json(ws), null, 2))
      } catch (err) { reject(err) }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

export function convertBase(num, fromBase, toBase) {
  const decimal = parseInt(String(num), fromBase)
  if (isNaN(decimal)) throw new Error('无效数字')
  return decimal.toString(toBase).toUpperCase()
}

export function formatTimestamp(ts, unit = 's') {
  const ms = unit === 'ms' ? Number(ts) : Number(ts) * 1000
  return new Date(ms).toLocaleString('zh-CN', { hour12: false })
}

export function dateToTimestamp(dateStr) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) throw new Error('无效日期')
  return { seconds: Math.floor(d.getTime() / 1000), milliseconds: d.getTime() }
}

export function batchConvertTimestamps(text, format = 'YYYY-MM-DD HH:mm:ss') {
  return text.split('\n').map(line => {
    const trimmed = line.trim()
    if (!trimmed) return ''
    const ts = trimmed.length > 10 ? Number(trimmed) : Number(trimmed) * 1000
    if (isNaN(ts)) return `错误: ${trimmed}`
    const d = new Date(ts)
    return formatDate(d, format)
  }).join('\n')
}

export function formatDate(date, format) {
  const pad = n => String(n).padStart(2, '0')
  const map = {
    YYYY: date.getFullYear(),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
  }
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, k => map[k])
}

export function convertDateFormat(input, fromFmt, toFmt) {
  const d = parseDateFormat(input, fromFmt)
  if (!d) throw new Error('无法解析日期')
  return formatDate(d, toFmt)
}

function parseDateFormat(input, fmt) {
  const d = new Date(input)
  if (!isNaN(d.getTime())) return d
  const parts = {}
  const regex = fmt.replace(/YYYY/g, '(\\d{4})').replace(/MM/g, '(\\d{2})').replace(/DD/g, '(\\d{2})')
    .replace(/HH/g, '(\\d{2})').replace(/mm/g, '(\\d{2})').replace(/ss/g, '(\\d{2})')
  const match = input.match(new RegExp(regex))
  if (!match) return null
  const keys = fmt.match(/YYYY|MM|DD|HH|mm|ss/g) || []
  keys.forEach((k, i) => { parts[k] = match[i + 1] })
  return new Date(`${parts.YYYY}-${parts.MM}-${parts.DD}T${parts.HH || '00'}:${parts.mm || '00'}:${parts.ss || '00'}`)
}
