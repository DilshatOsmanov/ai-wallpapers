import axios from 'axios'
import store from '@/store'

const httpClient = axios.create({
  baseURL: 'https://wallpaper-ai-1.onrender.com'
})

httpClient.interceptors.request.use((config) => {
  const token = store.getters.token
  config.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : null
  }
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.commit('logout')
    }
    return Promise.reject(error)
  }
)

export default httpClient
