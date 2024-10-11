import axios from '@/api/axios'

const addUser = async (data) => {
  const response = await axios.post('/users', data)
  return response
}

const resetPassword = async (data) => {
  const response = await axios.put('/auth/reset-password', data)
  return response
}

const checkEmail = async (data) => {
  const response = await axios.post('/auth/forgot-password', data)
  return response
}

const verifyEmail = async (data) => {
  const response = await axios.get('/users/verify', {
    params: data
  })
  return response
}

export { addUser, resetPassword, checkEmail, verifyEmail }
