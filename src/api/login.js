import axios from '@/api/axios'

const login = async (data) => {
  const response = await axios.post('/auth/login', data)
  return response
}

export { login }
