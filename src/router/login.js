import Login from '@/views/Login'
import SignUp from '@/views/SignUp'


export const LoginRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: SignUp,
    meta: {
      requiresAuth: false
    }
  }
]