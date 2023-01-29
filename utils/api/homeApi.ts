import axios from './index'
import { dateToString } from '../date'

export const fetchSummaryStats = (
  serverUrl: string,
  fromDate: Date,
  toDate: Date
) => {
  return axios({
    method: 'get',
    url: `api/organization/score?serverUrl=${encodeURIComponent(
      serverUrl
    )}&from=${dateToString(fromDate)}&to=${dateToString(toDate)}`,
  })
}
export const fetchRankings = (
  serverUrl: string,
  fromDate: Date,
  toDate: Date
) => {
  return axios({
    method: 'get',
    url: `api/organization/rankings?serverUrl=${encodeURIComponent(
      serverUrl
    )}&from=${dateToString(fromDate)}&to=${dateToString(toDate)}`,
  })
}
