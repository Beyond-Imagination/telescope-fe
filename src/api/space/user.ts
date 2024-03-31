import { IUser } from '@/types'

export async function getMe(serverUrl: string, accessToken: string): Promise<IUser> {
    const res = await fetch(`${serverUrl}/api/http/team-directory/profiles/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
        },
    })
    if (!res.ok) {
        throw new Error('fail to get user data from space')
    }
    return res.json()
}
