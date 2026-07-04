<template>
  <Transition name="wt-toast">
    <div v-if="visible" class="wt-toast" role="status">
      <span class="wt-toast__icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="wt-toast__text">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { useToast } from '../composables/useToast'

const { visible, message } = useToast()
</script>

<style scoped>
.wt-toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(12px);
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.08);
  font-size: 14px;
  font-weight: 500;
  pointer-events: none;
}
.wt-toast__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border-radius: 50%;
}
.wt-toast-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.wt-toast-leave-active { transition: all 0.25s ease; }
.wt-toast-enter-from { opacity: 0; transform: translateX(-50%) translateY(-16px) scale(0.9); }
.wt-toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.95); }
</style>
