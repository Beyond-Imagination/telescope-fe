import axios from './index'
import { dateToString } from '../date'

export const fetchSummaryStats = (serverUrl: string, fromDate: Date) => {
  return axios({
    method: 'get',
    url: `api/organization/score?serverUrl=${encodeURIComponent(
      serverUrl
    )}&from=${dateToString(fromDate)}`,
  })
}
export const fetchRankings = (serverUrl: string, fromDate: Date) => {
  return axios({
    method: 'get',
    url: `api/organization/rankings?serverUrl=${encodeURIComponent(
      serverUrl
    )}&from=${dateToString(fromDate)}`,
  })
}

export async function fetchProfileImage(
  serverUrl: string,
  token: string,
  profilePicture: string
): Promise<string> {
  const response = await axios({
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `api/users/picture?serverUrl=${serverUrl}&profilePicture=${profilePicture}`,
    responseType: 'arraybuffer',
  })
  const arrayBuffer = new Uint8Array(response.data)
  const blob = new Blob([arrayBuffer], { type: 'image/png' })
  return URL.createObjectURL(blob)
}
