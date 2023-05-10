import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'despositar',
      component: () => import('../views/Deposito.vue')
    },
  ]
})

export default router
