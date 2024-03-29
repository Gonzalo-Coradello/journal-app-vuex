import { computed } from 'vue'
import { useStore } from 'vuex'

const useAuth = () => {
  const store = useStore()

  const createUser = async (user) => {
    const response = await store.dispatch('auth/createUser', user)
    return response
  }

  const loginUser = async (user) => {
    const response = await store.dispatch('auth/signInUser', user)
    return response
  }

  const checkAuthStatus = async () => {
    const response = await store.dispatch('auth/checkAuthentication')
    return response
  }

  return {
    checkAuthStatus,
    createUser,
    loginUser,

    authStatus: computed(() => store.getters['auth/currentState']),
    username: computed(() => store.getters['auth/username']),
    logout: () => {
      store.commit('auth/logout')
      store.commit('journal/clearEntries')
    }
  }
}

export default useAuth
