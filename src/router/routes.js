import isAuth from '@/router/middleware/isAuth'
import isNotAuth from '@/router/middleware/isNotAuth'

const routes = [
  {
    path: '/',
    name: 'main',
    meta: { middleware: [isAuth] },
    children: [
      {
        path: '/',
        name: 'images-upload-page',
        component: () => import('@/views/ImagesUploadView.vue')
      },
      {
        path: '/room',
        name: 'room-page',
        component: () => import('@/views/RoomView.vue')
      }
    ]
  },

  {
    path: '/',
    name: 'login-page',
    meta: { middleware: [isNotAuth] },
    component: () => import('@/views/Authentication/SignIn.vue')
  },
  {
    path: '/sign-up',
    name: 'register-page',
    meta: { middleware: [isNotAuth] },
    component: () => import('@/views/Authentication/SignUp.vue')
  },
  {
    path: '/users/verify',
    name: 'verify-email-page',
    meta: { middleware: [isNotAuth] },
    component: () => import('@/views/Authentication/VerifyEmail.vue')
  },
  {
    path: '/users/reset-password',
    name: 'password-reset-page',
    meta: { middleware: [isNotAuth] },
    component: () => import('@/views/Authentication/PasswordReset.vue')
  },
  {
    path: '/auth/google',
    name: 'google-auth-page',
    meta: { middleware: [isNotAuth] },
    component: () => import('@/views/Authentication/GoogleAuth.vue')
  }
]

export default routes
