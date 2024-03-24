'use client'

import { useQuery } from '@tanstack/react-query'

import { ICredential, IOrganization } from '@/types'
import getCredential from '@/services/space/auth'
import { getOrganization } from '../../utils/api/spaceApi'

export function useCredential(): ICredential {
    const { data: credential } = useQuery<ICredential | null>(['accessToken'], () => getCredential(), {
        suspense: true,
        cacheTime: 1000 * 60 * 9, // 9 minutes
        staleTime: 1000 * 60 * 9, // 9 minutes
    })

    return credential!
}

export function useOrganization(): IOrganization {
    const credential = useCredential()
    const { data: organization } = useQuery<IOrganization>(['organization'], () => getOrganization(credential.serverUrl, credential.token), {
        enabled: !!credential,
        suspense: true,
        cacheTime: 1000 * 60 * 60 * 2, // 2 hour
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    return organization!
}
