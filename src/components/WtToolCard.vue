<template>
  <article
    class="wt-card"
    :class="`wt-card--${tool.category}`"
    :style="{ '--wt-card-accent': catColor, '--wt-card-delay': `${(index % 12) * 50}ms` }"
  >
    <div class="wt-card__bg" aria-hidden="true">
      <div class="wt-card__bg-gradient" />
      <div class="wt-card__bg-shine" />
    </div>
    <RouterLink :to="`/tool/${tool.id}`" class="wt-card__link">
      <div class="wt-card__top">
        <div class="wt-card__icon-wrap">
          <img :src="iconSrc" :alt="tool.name" width="24" height="24" loading="lazy" @error="onImgError" />
        </div>
        <span class="wt-card__badge">{{ catName }}</span>
      </div>
      <h3 class="wt-card__title">{{ tool.name }}</h3>
      <p class="wt-card__desc">{{ tool.desc }}</p>
      <span class="wt-card__arrow">
        <WtIcon name="arrow-right" :size="16" />
      </span>
    </RouterLink>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { categories } from '../data/tools'
import { getDefaultIconSrc, getToolIconSrc } from '../utils/toolIcon'
import WtIcon from './WtIcon.vue'

const props = defineProps({ tool: Object, index: { type: Number, default: 0 } })

const catMeta = computed(() => categories.find(c => c.id === props.tool.category))
const catColor = computed(() => catMeta.value?.color || '#6366f1')
const catName = computed(() => catMeta.value?.name || '工具')
const iconSrc = computed(() => getToolIconSrc(props.tool))

function onImgError(e) { e.target.src = getDefaultIconSrc() }
</script>
