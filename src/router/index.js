import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import { LoginRoutes } from '@/router/login'
import { protectedRoutes } from '@/router/protectedRoutes'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  ...protectedRoutes,
  ...LoginRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

let userLogged = localStorage.getItem('userLogged') === 'true' ? true : false

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if ( !userLogged ) {
      next('/login')
    } else {
      next()
    }
  } else {
    if ( to.name === 'Login' || to.name === 'Register') {
      if ( userLogged ) {
        next('/')
      } else {
        next()
      }
    }
    next()
  }
})

export default router
