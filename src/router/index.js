import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('@/views/InitialView.vue'),
    },
    {
      path: '/productos',
      name: 'products',
      component: import('@/views/HomeView.vue'),
    },

  ]
})

export default router
