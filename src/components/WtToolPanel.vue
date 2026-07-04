<template>
  <div class="wt-tool-panel">
    <div class="wt-tool-panel__header">
      <h2 class="wt-tool-panel__title">{{ title }}</h2>
      <div class="wt-tool-panel__actions">
        <slot name="actions" />
        <button v-if="showCopy" class="wt-btn wt-btn--ghost" @click="copyText(output)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          复制结果
        </button>
      </div>
    </div>
    <p v-if="description" class="wt-tool-panel__desc">{{ description }}</p>
    <div v-if="error" class="wt-tool-panel__error">{{ error }}</div>
    <div class="wt-tool-panel__body" :class="{ 'wt-tool-panel__body--single': single }">
      <div v-if="!single" class="wt-tool-panel__col">
        <label class="wt-label">输入</label>
        <textarea
          class="wt-textarea"
          :value="input"
          :placeholder="inputPlaceholder"
          @input="$emit('update:input', $event.target.value)"
        />
      </div>
      <div class="wt-tool-panel__col">
        <label class="wt-label">{{ single ? '内容' : '输出' }}</label>
        <textarea
          class="wt-textarea wt-textarea--output"
          :value="output"
          readonly
          :placeholder="outputPlaceholder"
        />
      </div>
    </div>
    <div v-if="$slots.extra" class="wt-tool-panel__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup>
import { copyText } from '../composables/useToast'

defineProps({
  title: String,
  description: String,
  input: { type: String, default: '' },
  output: { type: String, default: '' },
  error: String,
  single: Boolean,
  showCopy: { type: Boolean, default: true },
  inputPlaceholder: { type: String, default: '在此输入...' },
  outputPlaceholder: { type: String, default: '结果将显示在这里...' },
})
defineEmits(['update:input'])
</script>
