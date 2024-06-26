import axios from './index'
import { dateToString } from '../date'

export const fetchSummaryStats = (serverUrl: string, fromDate: Date, timezone: String) => {
    return axios({
        method: 'get',
        url: `api/organization/score?serverUrl=${encodeURIComponent(serverUrl)}&from=${dateToString(fromDate)}&timezone=${timezone}`,
    })
}

export const fetchScoreList = (serverUrl: string, timezone: String) => {
    return axios({
        method: 'get',
        url: `api/organization/score/list?serverUrl=${encodeURIComponent(serverUrl)}&timezone=${timezone}`,
    })
}

export const fetchRankings = (serverUrl: string, fromDate: Date, timezone: String) => {
    return axios({
        method: 'get',
        url: `api/organization/rankings?serverUrl=${encodeURIComponent(serverUrl)}&from=${dateToString(fromDate)}&timezone=${timezone}`,
    })
}

export const fetchCodeLinesRankings = (serverUrl: string, fromDate: Date, timezone: String) => {
    return axios({
        method: 'get',
        url: `api/organization/code-lines/rankings?serverUrl=${encodeURIComponent(serverUrl)}&from=${dateToString(fromDate)}&timezone=${timezone}`,
    })
}

export async function fetchProfileImage(serverUrl: string, token: string, profilePicture: string): Promise<string> {
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

export const fetchRemainStar = (serverUrl: string, userId: string, timezone: String) => {
    return axios({
        method: 'get',
        url: `api/users/remainStar?serverUrl=${encodeURIComponent(serverUrl)}&userId=${userId}&timezone=${timezone}`,
    })
}

export const fetchStarryPeople = (serverUrl: string, fromDate: Date, toDate: Date, timezone: String) => {
    return axios({
        method: 'get',
        url: `api/organization/star/rankings?serverUrl=${encodeURIComponent(serverUrl)}&from=${dateToString(fromDate)}&to=${dateToString(
            toDate,
        )}&timezone=${timezone}`,
    })
}
