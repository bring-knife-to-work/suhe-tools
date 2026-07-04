<template>
  <div class="wt-page">
    <!-- Hero -->
    <section v-if="showHero" class="wt-hero">
      <div class="wt-hero__content">
        <div class="wt-hero__badge">
          <span class="wt-hero__badge-dot" />
          纯前端 · 即开即用
        </div>
        <h1 class="wt-hero__title">
          <span class="wt-hero__title-gradient">素盒</span>
          工具箱
        </h1>
        <p class="wt-hero__desc">涵盖编程开发、单位转换、图像处理、便民生活等 {{ totalCount }} 个实用工具，无需安装，浏览器直达。</p>
        <div class="wt-hero__stats">
          <div v-for="cat in statCategories" :key="cat.id" class="wt-hero__stat">
            <span class="wt-hero__stat-icon" :style="{ background: cat.color + '20', color: cat.color }">{{ cat.icon }}</span>
            <div>
              <strong>{{ getToolsByCategory(cat.id).length }}</strong>
              <span>{{ cat.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="wt-hero__visual" aria-hidden="true">
        <div class="wt-hero__card wt-hero__card--1">JSON</div>
        <div class="wt-hero__card wt-hero__card--2">
          <span>PNG</span><WtIcon name="arrow-right" :size="12" /><span>WebP</span>
        </div>
        <div class="wt-hero__card wt-hero__card--3">
          <span>°C</span><WtIcon name="arrow-swap" :size="12" /><span>°F</span>
        </div>
        <div class="wt-hero__ring" />
      </div>
    </section>

    <!-- Category header (non-all mode) -->
    <header v-else class="wt-page-header">
      <div class="wt-page-header__icon" :style="{ background: currentCat?.color + '18', color: currentCat?.color }">
        {{ currentCat?.icon }}
      </div>
      <div>
        <h1 class="wt-page__title">{{ pageTitle }}</h1>
        <p class="wt-page__subtitle">{{ currentCat?.desc }}</p>
      </div>
      <span class="wt-page-header__count">{{ list.length }} 个工具</span>
    </header>

    <!-- Category pills on home -->
    <div v-if="mode === 'all'" class="wt-pills">
      <RouterLink to="/" class="wt-pill" :class="{ 'wt-pill--active': !activeCat }">全部</RouterLink>
      <RouterLink
        v-for="cat in statCategories"
        :key="cat.id"
        :to="`/category/${cat.id}`"
        class="wt-pill"
        :style="{ '--wt-pill-color': cat.color }"
      >
        <span>{{ cat.icon }}</span>{{ cat.name }}
      </RouterLink>
    </div>

    <!-- Grouped sections (all mode, no search) -->
    <template v-if="groupedSections">
      <section v-for="section in groupedSections" :key="section.id" class="wt-section">
        <div class="wt-section__head">
          <span class="wt-section__icon" :style="{ background: section.color + '18', color: section.color }">{{ section.icon }}</span>
          <h2 class="wt-section__title">{{ section.name }}</h2>
          <RouterLink :to="`/category/${section.id}`" class="wt-section__more" :style="{ color: section.color }">
            查看全部 <WtIcon name="arrow-right" :size="14" />
          </RouterLink>
        </div>
        <div class="wt-grid">
          <WtToolCard v-for="(tool, i) in section.tools" :key="tool.id" :tool="tool" :index="i" />
        </div>
      </section>
    </template>

    <!-- Flat grid (search or category) -->
    <template v-else>
      <div class="wt-grid">
        <WtToolCard v-for="(tool, i) in list" :key="tool.id" :tool="tool" :index="i" />
      </div>
    </template>

    <div v-if="!list.length" class="wt-empty">
      <div class="wt-empty__icon">🔍</div>
      <p>未找到匹配的工具</p>
      <button class="wt-btn wt-btn--ghost" @click="store.searchQuery = ''">清除搜索</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import WtToolCard from '../components/WtToolCard.vue'
import WtIcon from '../components/WtIcon.vue'
import { useAppStore } from '../stores/app'
import { getToolsByCategory, categories, tools } from '../data/tools'

const props = defineProps({
  mode: { type: String, default: 'all' },
  catId: { type: String, default: 'all' },
})

const store = useAppStore()
const route = useRoute()

const statCategories = categories.filter(c => c.id !== 'all')
const totalCount = tools.length

const showHero = computed(() => props.mode === 'all' && !store.searchQuery.trim())
const activeCat = computed(() => route.params.catId)

const currentCat = computed(() =>
  props.mode === 'category' ? categories.find(c => c.id === props.catId) : null
)

const pageTitle = computed(() => currentCat.value?.name || '全部工具')

const list = computed(() => {
  if (props.mode === 'category') {
    const catTools = getToolsByCategory(props.catId)
    const q = store.searchQuery.trim().toLowerCase()
    if (!q) return catTools
    return catTools.filter(t => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q))
  }
  return store.filteredTools
})

const groupedSections = computed(() => {
  if (props.mode !== 'all' || store.searchQuery.trim()) return null
  return statCategories.map(cat => ({
    ...cat,
    tools: getToolsByCategory(cat.id).slice(0, 6),
  })).filter(s => s.tools.length)
})
</script>
