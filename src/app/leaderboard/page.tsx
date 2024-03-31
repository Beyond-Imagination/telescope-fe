'use client'

import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Dashboard from '../../../components/main/Dashboard'
import { useCredential, useOrganization } from '@/hooks'
import { fetchCodeLinesRankings, fetchProfileImage, fetchRankings, fetchScoreList, fetchSummaryStats } from '../../../utils/api/homeApi'
import { convertDateByType } from '../../../utils/date'
import { IType } from '../../../components/common/MainTitle'
import { useTimeTypeStore } from '@/store/TimeTypeStore'

const initialAchieveTypes: IType[] = [
    {
        name: 'type1',
        display: 'Create Issues',
        color: '#F2994A',
        active: true,
        priority: 1,
    },
    {
        name: 'type2',
        display: 'Resolve Issues',
        color: '#9B51E0',
        active: true,
        priority: 2,
    },
    {
        name: 'type3',
        display: 'Create Code Review',
        color: '#2F80ED',
        active: true,
        priority: 3,
    },
    {
        name: 'type4',
        display: 'Merge MR',
        color: '#27AE60',
        active: true,
        priority: 4,
    },
    {
        name: 'type5',
        display: 'Code Review Discussion',
        color: '#C34ED7',
        active: true,
        priority: 5,
    },
    {
        name: 'type6',
        display: 'Accept Code Review',
        color: '#56CCF2',
        active: true,
        priority: 6,
    },
    {
        name: 'type7',
        display: 'Receive Star',
        color: '#F2C94C',
        active: true,
        priority: 7,
    },
]

const initialCodeTypes: IType[] = [
    {
        name: 'type1',
        display: 'Added Code',
        color: '#54B476',
        active: true,
        priority: 1,
    },
    {
        name: 'type2',
        display: 'Deleted Code',
        color: '#CB5A5D',
        active: true,
        priority: 2,
    },
]

export default function LeaderboardPage() {
    const [achieveTypes] = useState(initialAchieveTypes)
    const [codeLineTypes] = useState(initialCodeTypes)
    const [profileMap, setProfileMap] = useState(new Map())
    const timeType = useTimeTypeStore(state => state.timeType)
    const [userTimezone, setUserTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [indicatorType, setIndicatorType] = useState('Achievement')

    let today = new Date()
    const credential = useCredential()

    const organization = useOrganization()
    const { data: rankingsResponse } = useQuery({
        queryKey: [timeType, credential?.serverUrl, 'ranking'],
        queryFn: () => fetchRankingsHook(),
        enabled: !!credential,
    })
    const { data: codeLineRankingsResponse } = useQuery({
        queryKey: [timeType, credential?.serverUrl, 'codeLineRankings'],
        queryFn: () => fetchCodeLineRankingsHook(),
        enabled: !!credential,
    })
    const { data: summaryResponse } = useQuery({
        queryKey: [timeType, credential?.serverUrl, 'stat'],
        queryFn: () => fetchSummaryStatsHook(),
        enabled: !!credential,
    })

    const fetchRankingsHook = useCallback(() => {
        if (credential) return fetchRankings(credential.serverUrl, convertDateByType(timeType, today), userTimezone)
    }, [credential, timeType, userTimezone])

    const fetchCodeLineRankingsHook = useCallback(() => {
        if (credential) return fetchCodeLinesRankings(credential.serverUrl, convertDateByType(timeType, today), userTimezone)
    }, [credential, timeType, userTimezone])

    const fetchSummaryStatsHook = useCallback(() => {
        if (credential) return fetchSummaryStats(credential.serverUrl, convertDateByType(timeType, today), userTimezone)
    }, [credential, timeType, userTimezone])

    const fetchScoreListHook = useCallback(() => {
        if (credential) return fetchScoreList(credential.serverUrl, userTimezone)
    }, [credential, userTimezone])

    useEffect(() => {
        async function fetchProfile(users: any[]) {
            const promises = users.map(user => {
                return new Promise<void>(async (resolve, reject) => {
                    if (user.profilePicture && !profileMap.has(user.profilePicture)) {
                        const profile = await fetchProfileImage(credential?.serverUrl as string, credential?.token as string, user.profilePicture)
                        setProfileMap(
                            // @ts-ignore
                            prev => new Map([...prev, [user.profilePicture, profile]]),
                        )
                        resolve()
                    }
                })
            })
            await Promise.all(promises)
        }
        if (credential?.token) {
            if (rankingsResponse) {
                fetchProfile(rankingsResponse.data.rankings)
            }
        }
    }, [credential, rankingsResponse, timeType])

    return (
        <>
            <Dashboard
                organization={organization}
                rankingsResponse={rankingsResponse?.data}
                codeLineRankingsResponse={codeLineRankingsResponse?.data}
                summaryResponse={summaryResponse?.data}
                profileMap={profileMap}
                achieveTypes={achieveTypes}
                codeLineTypes={codeLineTypes}
                indicatorType={indicatorType}
                setIndicatorType={setIndicatorType}
            ></Dashboard>
        </>
    )
}
