<template>
  <div class="wt-layout">
    <div class="wt-ambient" aria-hidden="true">
      <div class="wt-ambient__orb wt-ambient__orb--1" />
      <div class="wt-ambient__orb wt-ambient__orb--2" />
      <div class="wt-ambient__orb wt-ambient__orb--3" />
      <div class="wt-ambient__grid" />
    </div>
    <WtSidebar />
    <main class="wt-main">
      <div v-if="store.searchOpen" class="wt-search">
        <svg class="wt-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          v-model="store.searchQuery"
          class="wt-search__input"
          type="text"
          placeholder="搜索工具名称或描述..."
          maxlength="30"
          autofocus
        />
        <button v-if="store.searchQuery" class="wt-search__clear" @click="store.searchQuery = ''">✕</button>
        <span class="wt-search__hint"><kbd>Alt</kbd><kbd>Q</kbd> 开关</span>
      </div>
      <RouterView v-slot="{ Component }">
        <Transition name="wt-page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <WtToast />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import WtSidebar from './WtSidebar.vue'
import WtToast from './WtToast.vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()

function onKeydown(e) {
  if (e.altKey && e.key.toLowerCase() === 'q') {
    e.preventDefault()
    store.toggleSearch()
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>
