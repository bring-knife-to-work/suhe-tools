<template>
  <aside class="wt-sidebar">
    <!-- 装饰背景 -->
    <div class="wt-sidebar__bg" aria-hidden="true">
      <div class="wt-sidebar__bg-gradient" />
      <div class="wt-sidebar__bg-orb wt-sidebar__bg-orb--1" />
      <div class="wt-sidebar__bg-orb wt-sidebar__bg-orb--2" />
      <div class="wt-sidebar__bg-mesh" />
    </div>
    <div class="wt-sidebar__accent" aria-hidden="true" />

    <header class="wt-sidebar__header">
      <RouterLink to="/" class="wt-logo" @click="mobileOpen = false">
        <div class="wt-logo__ring">
          <div class="wt-logo__icon">
            <img src="/favicon.svg" alt="" width="32" height="32" class="wt-logo__img" />
          </div>
        </div>
        <div class="wt-logo__text-wrap">
          <span class="wt-logo__text">素盒工具箱</span>
          <span class="wt-logo__sub">简约 · 实用</span>
        </div>
      </RouterLink>
      <button class="wt-sidebar__toggle" :class="{ 'wt-sidebar__toggle--open': mobileOpen }" @click="mobileOpen = !mobileOpen" aria-label="菜单">
        <span class="wt-sidebar__toggle-bar" />
        <span class="wt-sidebar__toggle-bar" />
        <span class="wt-sidebar__toggle-bar" />
      </button>
    </header>

    <div class="wt-sidebar__divider" aria-hidden="true" />

    <div class="wt-nav__scroll">
      <nav class="wt-nav" :class="{ 'wt-nav--open': mobileOpen }">
        <RouterLink to="/" class="wt-nav__item wt-nav__item--primary" exact-active-class="wt-nav__item--active" @click="mobileOpen = false">
          <span class="wt-nav__icon-wrap wt-nav__icon-wrap--home">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </span>
          <span class="wt-nav__label">全部工具</span>
        </RouterLink>
        <button class="wt-nav__item wt-nav__item--primary" :class="{ 'wt-nav__item--active': store.searchOpen }" @click="store.toggleSearch()">
          <span class="wt-nav__icon-wrap wt-nav__icon-wrap--search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </span>
          <span class="wt-nav__label">搜索工具</span>
          <span class="wt-nav__kbd"><kbd>Alt</kbd><kbd>Q</kbd></span>
        </button>

        <div class="wt-nav__section">
          <div class="wt-nav__section-title">
            <span>工具分类</span>
            <span class="wt-nav__section-line" />
          </div>

          <template v-for="(cat, ci) in categories.filter(c => c.id !== 'all')" :key="cat.id">
            <button
              class="wt-nav__item wt-nav__item--category"
              :class="{ 'wt-nav__item--expanded': expanded[cat.id] }"
              :style="{ '--wt-cat-color': cat.color, '--wt-nav-delay': `${ci * 40}ms` }"
              @click="toggleCat(cat.id)"
            >
              <span class="wt-nav__icon-wrap" :style="{ background: cat.color + '18', color: cat.color, borderColor: cat.color + '25' }">{{ cat.icon }}</span>
              <span class="wt-nav__label">{{ cat.name }}</span>
              <span class="wt-nav__count" :style="{ color: cat.color, background: cat.color + '12' }">{{ getToolsByCategory(cat.id).length }}</span>
              <span class="wt-nav__arrow" :class="{ 'wt-nav__arrow--open': expanded[cat.id] }">
                <WtIcon name="chevron-down" :size="14" />
              </span>
              <span class="wt-nav__item-shine" aria-hidden="true" />
            </button>
            <Transition name="wt-nav-sub">
              <div v-show="expanded[cat.id]" class="wt-nav__sub">
                <RouterLink
                  :to="`/category/${cat.id}`"
                  class="wt-nav__sub-item wt-nav__sub-item--all"
                  :style="{ '--wt-cat-color': cat.color }"
                  active-class="wt-nav__sub-item--active"
                  @click="mobileOpen = false"
                >
                  <WtIcon name="arrow-right" :size="12" />
                  查看全部 {{ cat.name }}
                </RouterLink>
                <RouterLink
                  v-for="tool in getToolsByCategory(cat.id).slice(0, 6)"
                  :key="tool.id"
                  :to="`/tool/${tool.id}`"
                  class="wt-nav__sub-item"
                  :style="{ '--wt-cat-color': cat.color }"
                  active-class="wt-nav__sub-item--active"
                  @click="mobileOpen = false"
                >{{ tool.name }}</RouterLink>
              </div>
            </Transition>
          </template>
        </div>
      </nav>
    </div>

    <footer class="wt-sidebar__footer">
      <div class="wt-sidebar__badge">
        <span class="wt-sidebar__badge-dot" />
        <span>{{ tools.length }}+ 工具本地运行</span>
        <span class="wt-sidebar__badge-glow" aria-hidden="true" />
      </div>
    </footer>
  </aside>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAppStore } from '../stores/app'
import { categories, getToolsByCategory, tools } from '../data/tools'
import WtIcon from './WtIcon.vue'

const store = useAppStore()
const mobileOpen = ref(false)
const expanded = reactive({ code: true, unit: false, life: false, image: false, media: false, text: false, encode: false, doc: false, webmaster: false })

function toggleCat(id) {
  expanded[id] = !expanded[id]
}
</script>
