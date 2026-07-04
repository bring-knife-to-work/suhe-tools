<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="wt-icon"
    :class="`wt-icon--${name}`"
  >
    <!-- 右箭头 -->
    <template v-if="name === 'arrow-right'">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </template>
    <!-- 左箭头 -->
    <template v-else-if="name === 'arrow-left'">
      <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
    </template>
    <!-- 双向箭头 -->
    <template v-else-if="name === 'arrow-swap'">
      <path d="M8 3 4 7l4 4" /><path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" /><path d="M20 17H4" />
    </template>
    <!-- 下箭头 -->
    <template v-else-if="name === 'chevron-down'">
      <path d="m6 9 6 6 6-6" />
    </template>
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 16 },
  strokeWidth: { type: [Number, String], default: 2 },
})
</script>
