export default function auth({ next, store, nextMiddleware }) {
  if (store.getters.isUserAuthenticated) {
    return next({
      name: 'main'
    })
  }

  return nextMiddleware()
}
