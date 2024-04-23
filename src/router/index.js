import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import InitialView from '@/views/InitialView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InitialView,
    },
    {
      path: '/productos',
      name: 'products',
      component: HomeView,
    },
  ]
})

export default router
