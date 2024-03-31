import { TELESCOPE_SERVER_URL } from '@/config'
import { IRemainStar } from '@/types'

export async function getRemainStar(serverUrl: string, userId: string, timezone: String): Promise<IRemainStar> {
    const res = await fetch(
        `${TELESCOPE_SERVER_URL}/api/users/remainStar?serverUrl=${encodeURIComponent(serverUrl)}&userId=${userId}&timezone=${timezone}`,
        {
            method: 'GET',
        },
    )
    if (!res.ok) {
        throw new Error('fail to get remain star')
    }
    return res.json()
}
