import router from '@/router'
import { login } from '@/api/login'

export default {
  state() {
    const sessionUserToken = sessionStorage.getItem('userToken')
    const localUserToken = localStorage.getItem('userToken')

    const userToken = sessionUserToken
      ? JSON.parse(sessionUserToken)
      : localUserToken
        ? JSON.parse(localUserToken)
        : null

    return {
      token: userToken ? userToken : null,
      user: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null,
      isKeepLogin: localStorage.getItem('isKeepLogin') === 'true' ? true : false
    }
  },
  mutations: {
    keepLogin(state, isKeepLogin) {
      localStorage.setItem('isKeepLogin', isKeepLogin)
      state.isKeepLogin = isKeepLogin
    },
    removeKeepLogin(state) {
      localStorage.removeItem('isKeepLogin')
      sessionStorage.removeItem('isKeepLogin')
      state.isKeepLogin = false
    },
    saveToken(state, token) {
      localStorage.setItem('userToken', JSON.stringify(token))
      state.token = token
    },
    saveTokenInSession(state, token) {
      sessionStorage.setItem('userToken', JSON.stringify(token))
      state.token = token
    },
    removeToken(state) {
      localStorage.removeItem('userToken')
      sessionStorage.removeItem('userToken')
      state.token = null
    },
    saveUser(state, user) {
      localStorage.setItem('userData', JSON.stringify(user))
      state.user = user
    },
    saveUserInSession(state, user) {
      sessionStorage.setItem('userData', JSON.stringify(user))
      state.user = user
    },
    removeUser(state) {
      localStorage.removeItem('userData')
      sessionStorage.removeItem('userData')
      state.user = null
    },
    logout() {
      this.commit('removeToken')
      this.commit('removeUser')

      router.push({
        name: 'login-page'
      })
    }
  },
  getters: {
    isKeepLogin(state) {
      return state.isKeepLogin
    },
    token(state) {
      return state.token?.access_token
    },
    refresh_token(state) {
      return state.token?.refresh_token
    },
    isUserAuthenticated(state) {
      return !!state.token
    },
    user(state) {
      return state.user
    }
  },
  actions: {
    async login(context, data) {
      context.commit('removeToken')
      context.commit('removeUser')
      context.commit('removeKeepLogin')

      const response = await login(data)

      context.commit('keepLogin', data.isKeepLogin)
      data.isKeepLogin
        ? context.commit('saveToken', response?.data)
        : context.commit('saveTokenInSession', response?.data)

      router.push({
        name: 'images-upload-page'
      })
    },
    setToken(context, data) {
      context.commit('removeToken')
      context.commit('removeUser')
      context.commit('removeKeepLogin')
      context.commit('keepLogin', false)
      context.commit('saveToken', data)

      router.push({
        name: 'images-upload-page'
      })
    },
    logout(context) {
      context.commit('logout')
    }
  }
}
