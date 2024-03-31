'use client'

import { useQuery } from '@tanstack/react-query'

import { ICredential, IOrganization } from '@/types'
import getCredential from '@/services/space/auth'
import { getOrganization } from '../../utils/api/spaceApi'

export function useCredential(): ICredential {
    const { data: credential } = useQuery<ICredential | null>({
        queryKey: ['accessToken'],
        queryFn: () => getCredential(),
        gcTime: 1000 * 60 * 10, // 10 minutes
        staleTime: 1000 * 60 * 9, // 9 minutes
    })

    return credential!
}

export function useOrganization(): IOrganization {
    const credential = useCredential()
    const { data: organization } = useQuery<IOrganization>({
        queryKey: ['organization'],
        queryFn: () => getOrganization(credential.serverUrl, credential.token),
        enabled: !!credential,
        gcTime: 1000 * 60 * 60 * 2, // 2 hour
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    return organization!
}
