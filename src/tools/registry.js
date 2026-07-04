import { defineAsyncComponent } from 'vue'
import { getToolById } from '../data/tools'

const lazy = (name) => defineAsyncComponent(() => import(`./${name}.vue`))
const lazyGeneric = (name) => defineAsyncComponent(() => import(`./generic/${name}.vue`))

export const toolComponents = {
  'json-formatter': lazy('JsonFormatter'),
  'css-formatter': lazy('CssFormatter'),
  'html-formatter': lazy('HtmlFormatter'),
  'sql-format': lazy('SqlFormat'),
  'yaml-formatter': lazy('YamlFormatter'),
  'timestamp': lazy('Timestamp'),
  'timestamp-batch': lazy('TimestampBatch'),
  'datetime-converter': lazy('DatetimeConverter'),
  'camel': lazy('CamelCase'),
  'hex-converter': lazy('HexConverter'),
  'html-escape': lazy('HtmlEscape'),
  'html-filter': lazy('HtmlFilter'),
  'image-extract': lazy('ImageExtract'),
  'json-flatten': lazy('JsonFlatten'),
  'json-unflatten': lazy('JsonUnflatten'),
  'json-sort': lazy('JsonSort'),
  'json-csv': lazy('JsonCsv'),
  'csv-json': lazy('CsvJson'),
  'json-yaml': lazy('JsonYaml'),
  'yaml-json': lazy('YamlJson'),
  'json-xml': lazy('JsonXml'),
  'xml-json': lazy('XmlJson'),
  'json-excel': lazy('JsonExcel'),
  'excel-json': lazy('ExcelJson'),
  'php-serialize': lazy('PhpSerialize'),
  'pwa-manifest': lazy('PwaManifest'),
  'screen-inspector': lazy('ScreenInspector'),
  'button-css': lazy('ButtonCss'),
  'loading': lazy('LoadingAnim'),
  'wechat': lazy('WechatSimulator'),
  'wechat-pro': lazy('WechatSimulator'),
  'wechat-group': lazy('WechatSimulator'),
  'wechat-moments': lazy('WechatSimulator'),
  'wechat-wallet': lazy('WechatWallet'),
}

const genericPages = {
  unit: lazyGeneric('UnitToolPage'),
  life: lazyGeneric('LifeToolPage'),
  image: lazyGeneric('ImageToolPage'),
  media: lazyGeneric('MediaToolPage'),
  text: lazyGeneric('TextToolPage'),
  encode: lazyGeneric('EncodeToolPage'),
  doc: lazyGeneric('DocToolPage'),
  webmaster: lazyGeneric('WebmasterToolPage'),
}

export function resolveToolComponent(id) {
  if (toolComponents[id]) return toolComponents[id]
  const tool = getToolById(id)
  if (!tool) return null
  return genericPages[tool.category] || null
}
