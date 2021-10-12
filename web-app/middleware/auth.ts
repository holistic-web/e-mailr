import { Middleware } from '@nuxt/types'

const auth: Middleware = (context) => {
  const isLoggedIn = context.store.getters['account/isLoggedIn']
  if (isLoggedIn) {
    if (context.route.path === '/login') context.redirect('/')
  } else if (context.route.path !== '/login') context.redirect('/login')
}

export default auth
