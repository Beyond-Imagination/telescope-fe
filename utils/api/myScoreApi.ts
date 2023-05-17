import axios from './index'
import { dateToString } from '../date'

export function fetchScoreByUserId(
  userId: string,
  serverUrl: string,
  from: Date,
  to: Date
) {
  return axios({
    method: 'get',
    url: `api/users/${userId}/score?serverUrl=${encodeURIComponent(
      serverUrl
    )}&from=${dateToString(from)}&to=${dateToString(to)}`,
  })
}