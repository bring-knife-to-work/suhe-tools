<template>
  <div class="wt-page wt-page--tool">
    <nav class="wt-breadcrumb">
      <RouterLink to="/">首页</RouterLink>
      <span class="wt-breadcrumb__sep">/</span>
      <RouterLink v-if="catMeta" :to="`/category/${catMeta.id}`">{{ catMeta.name }}</RouterLink>
      <span v-if="catMeta" class="wt-breadcrumb__sep">/</span>
      <span class="wt-breadcrumb__current">{{ tool?.name }}</span>
    </nav>

    <header v-if="tool" class="wt-tool-header" :style="{ '--wt-tool-color': catMeta?.color }">
      <div class="wt-tool-header__icon" :style="{ background: (catMeta?.color || '#6366f1') + '15' }">
        <img :src="`/logos/${tool.icon || 'logo-default.svg'}`" width="40" height="40" alt="" @error="onImgError" />
      </div>
      <div class="wt-tool-header__info">
        <div class="wt-tool-header__meta">
          <span class="wt-tool-header__badge" :style="{ background: (catMeta?.color || '#6366f1') + '18', color: catMeta?.color }">
            {{ catMeta?.icon }} {{ catMeta?.name }}
          </span>
        </div>
        <h1 class="wt-tool-header__title">{{ tool.name }}</h1>
        <p class="wt-tool-header__desc">{{ tool.desc }}</p>
      </div>
      <RouterLink to="/" class="wt-tool-header__back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        返回
      </RouterLink>
    </header>

    <div v-if="toolComponent" class="wt-workspace">
      <component :is="toolComponent" />
    </div>
    <div v-else class="wt-empty">
      <div class="wt-empty__icon">⚠️</div>
      <p>工具未找到</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getToolById, categories } from '../data/tools'
import { resolveToolComponent } from '../tools/registry'

const route = useRoute()

const tool = computed(() => getToolById(route.params.id))
const toolComponent = computed(() => resolveToolComponent(route.params.id))
const catMeta = computed(() => categories.find(c => c.id === tool.value?.category))

function onImgError(e) { e.target.src = '/logos/logo-default.svg' }
</script>
