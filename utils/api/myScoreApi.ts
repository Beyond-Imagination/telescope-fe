import axios from './index'
import { dateToString } from '../date'

export function fetchScoreByUserId(userId: string, serverUrl: string, from: Date) {
    return axios({
        method: 'get',
        url: `api/users/${userId}/score?serverUrl=${encodeURIComponent(serverUrl)}&from=${dateToString(from)}`,
    })
}

export function fetchScoreListByUserId(userId: string, serverUrl: string) {
    return axios({
        method: 'get',
        url: `api/users/${userId}/score/list?serverUrl=${encodeURIComponent(serverUrl)}`,
    })
}
