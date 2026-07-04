import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { tools } from '../data/tools'

const SEARCH_KEY = 'wt-search-open'

export const useAppStore = defineStore('app', () => {
  const searchOpen = ref(localStorage.getItem(SEARCH_KEY) === 'true')
  const searchQuery = ref('')
  const categoriesExpanded = ref(true)

  const filteredTools = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return tools
    return tools.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q)
    )
  })

  function toggleSearch() {
    searchOpen.value = !searchOpen.value
    localStorage.setItem(SEARCH_KEY, String(searchOpen.value))
    if (!searchOpen.value) searchQuery.value = ''
  }

  return {
    searchOpen, searchQuery, categoriesExpanded,
    filteredTools, toggleSearch,
  }
})
