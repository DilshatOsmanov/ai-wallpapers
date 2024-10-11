import axios from '@/api/axios'

const getRoom = async () => {
  const response = await axios.get('/rooms/view_room/')
  return response
}

export { getRoom }
