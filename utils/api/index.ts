import Axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_API_SERVER_HOST
const PORT = process.env.NEXT_PUBLIC_API_SERVER_PORT
const BASE_URL = `${HOST}:${PORT}`

const axios = Axios.create({
  baseURL: BASE_URL,
})

export default axios
