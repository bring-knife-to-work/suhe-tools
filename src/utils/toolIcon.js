const DEFAULT_ICON = 'logo-default.svg'

/** 解析工具图标文件名，缺省时按 id 生成 */
export function resolveToolIcon(tool) {
  if (!tool) return DEFAULT_ICON
  const icon = tool.icon
  if (icon && icon !== DEFAULT_ICON) return icon
  return `logo-${tool.id}.svg`
}

/** 工具图标完整 URL（兼容 GitHub Pages base） */
export function getToolIconSrc(tool) {
  const base = import.meta.env.BASE_URL || '/'
  const file = resolveToolIcon(tool)
  return `${base}logos/${file}`.replace(/\/{2,}/g, '/').replace(':/', '://')
}

export function getDefaultIconSrc() {
  return getToolIconSrc({ icon: DEFAULT_ICON })
}
