import store from '@/store'

const isAuthenticatedGuard = async (to, from, next) => {
  console.log(store)

  const { ok } = await store.dispatch('auth/checkAuthentication')

  console.log({ ok })

  if (ok) next()
  else next({ name: 'login' })
}

export default isAuthenticatedGuard
