export default function auth({ next, store, nextMiddleware }) {
  if (!store.getters.isUserAuthenticated) {
    return next({
      name: 'login-page'
    })
  }

  return nextMiddleware()
}
