import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/upload',
      name: 'images-upload-page',
      component: () => import('../views/ImagesUploadView.vue')
    },
    {
      path: '/room',
      name: 'room-page',
      component: () => import('../views/RoomView.vue')
    }
  ]
})

export default router
