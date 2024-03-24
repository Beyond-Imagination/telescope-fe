'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchRankings, fetchScoreList, fetchSummaryStats } from '../../../utils/api/homeApi'
import { convertDateByType } from '../../../utils/date'
import Organization from '../../../components/organization/Organization'
import { useCredential, useOrganization } from '@/hooks'
import { useTimeTypeStore } from '@/store/TimeTypeStore'

export default function OrganizationPage() {
    const credential = useCredential()
    const [userTimezone, setUserTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const timeType = useTimeTypeStore(state => state.timeType)

    let fromDate = new Date()

    const { data: summaryResponse } = useQuery(
        [timeType, 'stat'],
        () => fetchSummaryStats(credential.serverUrl, convertDateByType(timeType, fromDate), userTimezone),
        {
            enabled: !!credential?.serverUrl,
        },
    )

    const organization = useOrganization()

    const { data: scoreListResponse } = useQuery(['scoreList'], () => fetchScoreList(credential.serverUrl, userTimezone), {
        enabled: !!credential?.serverUrl,
    })

    const { data: rankingsResponse } = useQuery(
        [timeType, 'ranking'],
        () => fetchRankings(credential.serverUrl, convertDateByType(timeType, fromDate), userTimezone),
        {
            enabled: !!credential?.serverUrl,
        },
    )

    return (
        <>
            <Organization
                organizationName={organization?.name}
                summaryResponse={summaryResponse?.data}
                rankingsResponse={rankingsResponse?.data}
                scoreListResponse={scoreListResponse?.data}
            ></Organization>
        </>
    )
}
