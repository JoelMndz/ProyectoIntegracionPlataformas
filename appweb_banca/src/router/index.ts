import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login/Login.vue')
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('../views/Registro/Registro.vue')
    },
    {
      path: '/cuentas',
      name: 'cuentas',
      component: () => import('../views/Cuenta/Cuenta.vue')
    }
  ]
})

export default router
