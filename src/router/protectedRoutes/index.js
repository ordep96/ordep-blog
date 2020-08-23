import createPost from '@/views/protected/CreatePost'
import Profile from '@/views/protected/Profile'
import DetailPost from '@/views/protected/DetailPost'

export const protectedRoutes = [
  {
    path: '/create-post',
    name: 'createPost',
    component: createPost,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/post/:idPost',
    name: 'detailPost',
    component: DetailPost,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'Profile',
    path: '/profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  }
]