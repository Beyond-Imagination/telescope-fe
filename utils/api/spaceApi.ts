import axios from '../api'

import { IOrganization } from '@/types'

export function getUserAccessTokenData(askForConsent: any) {
    return new Promise(resolve => {
        const channel = new MessageChannel()
        channel.port1.onmessage = e => resolve(e.data)
        window.parent.postMessage(
            {
                type: 'GetUserTokenRequest',
                permissionScope: 'global:Profile.View global:Profile.Memberships.View',
                askForConsent: askForConsent,
            },
            '*',
            [channel.port2],
        )
    })
}

export async function getOrganization(serverUrl: string, accessToken: string): Promise<IOrganization> {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
        },
    }
    return axios({
        method: 'get',
        url: `${serverUrl}/api/http/organization`,
        ...config,
    }).then(data => data.data)
}

export function getMe(serverUrl: string, accessToken: string) {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
        },
    }
    return axios({
        method: 'get',
        url: `${serverUrl}/api/http/team-directory/profiles/me`,
        ...config,
    }).then(data => data.data)
}
