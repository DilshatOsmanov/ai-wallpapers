import axios from 'axios'
import store from '@/store'
import router from '@/router'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_PATH
})

// Функция для обновления access токена
const refreshToken = async () => {
  try {
    const refreshToken = store.getters.refresh_token
    const response = await axios.post(import.meta.env.VITE_API_PATH + '/auth/refresh', null, {
      headers: { 'refresh-token': refreshToken }
    })

    if (store.getters.isKeepLogin) {
      store.commit('saveToken', response?.data)
    } else {
      store.commit('saveTokenInSession', response?.data)
    }

    return response?.data?.access_token
  } catch (error) {
    router.push({ name: 'login-page' }) // Перенаправляем на логин в случае ошибки
  }
}

// Добавляем интерсептор запросов для установки токена в заголовки
httpClient.interceptors.request.use(
  async (config) => {
    const token = store.getters.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Добавляем интерсептор ответов для проверки истечения токена
httpClient.interceptors.response.use(
  (response) => {
    return response // Если всё прошло успешно, просто возвращаем ответ
  },
  async (error) => {
    const originalRequest = error.config

    // Если запрос возвращает 401 (Unauthorized) и это не запрос на обновление токена
    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true // Помечаем запрос, чтобы не зациклиться
      const newToken = await refreshToken() // Обновляем токен
      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}` // Применяем новый токен
        return httpClient(originalRequest) // Повторяем запрос с новым токеном
      }
    }
    return Promise.reject(error)
  }
)

export default httpClient
