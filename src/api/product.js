import axios from '@/api/axios'

const getProduct = async (data) => {
  const response = await axios.post(`/products/leroymerlin/${data.type}`, {
    page: 1
  })
  return response
}

export { getProduct }
