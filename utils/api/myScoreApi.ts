import axios from './index'
import { dateToString } from '../date'

export function fetchScoreByUserId(userId: string, serverUrl: string, from: Date, timezone: String) {
    return axios({
        method: 'get',
        url: `api/users/${userId}/score?serverUrl=${encodeURIComponent(serverUrl)}&from=${dateToString(from)}&timezone=${timezone}`,
    })
}

export function fetchCodeLinesByUserId(userId: string, serverUrl: string, from: Date, timezone: String) {
    return axios({
        method: 'get',
        url: `api/users/${userId}/code-lines?serverUrl=${encodeURIComponent(serverUrl)}&from=${dateToString(from)}&timezone=${timezone}`,
    })
}

export function fetchScoreListByUserId(userId: string, serverUrl: string, timezone: String) {
    return axios({
        method: 'get',
        url: `api/users/${userId}/score/list?serverUrl=${encodeURIComponent(serverUrl)}&timezone=${timezone}`,
    })
}
