import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'
import routes from '@/router/routes'
import middlewarePipeline from '@/router/middlewarePipeline'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // secure routes
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
    ...context,
    nextMiddleware: middlewarePipeline(context, middleware, 1)
  })
})

export default router
