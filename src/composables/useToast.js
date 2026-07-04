import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
let timer = null

export function showToast(msg = '已复制到剪贴板', duration = 2200) {
  message.value = msg
  visible.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { visible.value = false }, duration)
}

export function useToast() {
  return { visible, message, show: showToast }
}

export async function copyText(text, msg = '已复制到剪贴板') {
  if (!text) {
    showToast('暂无内容可复制', 2000)
    return false
  }
  try {
    await navigator.clipboard.writeText(text)
    showToast(msg)
    return true
  } catch {
    showToast('复制失败，请手动复制', 2500)
    return false
  }
}
