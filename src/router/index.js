import { createRouter, createWebHistory } from 'vue-router'
import WtLayout from '../components/WtLayout.vue'

const routes = [
  {
    path: '/',
    component: WtLayout,
    children: [
      { path: '', component: () => import('../views/ToolListView.vue'), props: { mode: 'all' } },
      { path: 'category/:catId', component: () => import('../views/ToolListView.vue'), props: route => ({ mode: 'category', catId: route.params.catId }) },
      { path: 'tool/:id', component: () => import('../views/ToolPageView.vue') },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
