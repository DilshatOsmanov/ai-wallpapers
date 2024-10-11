import axios from '@/api/axios'

const getRoom = async () => {
  const response = await axios.get('/rooms/view_room/')
  return response
}

const createRoom = async (formData) => {
  const response = await axios.post('/rooms/create_room', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response
}

export { getRoom, createRoom }
