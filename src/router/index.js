import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ProductsPage from '@/pages/product/IndexPage.vue'
import LoginPage from '@/pages/auth/IndexPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/productos',
      name: 'products',
      component: ProductsPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
  ]
})

export default router
