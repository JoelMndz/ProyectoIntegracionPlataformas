import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login/Login.vue'),
      meta:{
        rutaProtegida:false
      }
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('../views/Registro/Registro.vue'),
      meta:{
        rutaProtegida:false
      }
    },
    {
      path: '/recuperar-password',
      name: 'recuperar-password',
      component: () => import('../views/Password/RecuperarPassword.vue'),
    },
    {
      path: '/cambiar-password',
      name: 'cambiar-password',
      component: () => import('../views/Password/CambiarPassword.vue'),
    },
    {
      path: '/cuentas',
      name: 'cuentas',
      component: () => import('../views/Cuenta/Cuenta.vue'),
      meta:{
        rutaProtegida:true
      }
    },
    {
      path: '/transferencia',
      name: 'transferencia',
      component: () => import('../views/Transferencia/Transferencia.vue'),
      meta:{
        rutaProtegida:true
      }
    },
    {
      path: '/contactos',
      name: 'contactos',
      component: () => import('../views/Contacto/Contacto.vue'),
      meta:{
        rutaProtegida:true
      }
    },
    {
      path: '/registro-contacto',
      name: 'registro-contacto',
      component: () => import('../views/Contacto/RegistroContacto.vue'),
      meta:{
        rutaProtegida:true
      }
    },
  ]
})

router.beforeEach((to, from, next)=>{  
  const token = localStorage.getItem('token');
  
  if ((to.meta.rutaProtegida && !token)) {
    next('/')
    return;
  }
  else if (!to.meta.rutaProtegida && token) {
    next('/cuentas')
    return;
  }
  next()
})

export default router
