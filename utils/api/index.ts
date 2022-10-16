import Axios from 'axios'

const HOST = process.env.NEXT_PUBLIC_ENV_HOST
const PORT = process.env.NEXT_PUBLIC_ENV_PORT
const BASE_URL = `${HOST}:${PORT}`

const axios = Axios.create({
  baseURL: BASE_URL,
})

export default axios
