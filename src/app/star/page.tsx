'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Star, { StarryPerson } from '../../../components/star/Star'
import { useCredential, useOrganization } from '@/hooks'
import { fetchProfileImage, fetchStarryPeople } from '../../../utils/api/homeApi'
import { useTimeTypeStore } from '@/store/TimeTypeStore'

export default function StarPage() {
    const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, [])
    const [starryPeople, setStarryPeople] = useState<{ [key: string]: StarryPerson }>({})
    const [profileMap, setProfileMap] = useState(new Map())

    const timeType = useTimeTypeStore(state => state.timeType)
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())

    const credential = useCredential()
    const organization = useOrganization()

    const { data: starryPeopleResponse } = useQuery([credential?.serverUrl, month], async () => await fetchStarryPeopleHook(), {
        enabled: !!credential?.token,
    })

    const fetchStarryPeopleHook = useCallback(async () => {
        if (Object.keys(starryPeople).length === 0) {
            // starryPeople가 비어있을 경우 최근 3개월 데이터를 가져옴
            await addStarryPeople(new Date(year, month - 2, 1), new Date(year, month, 0))
        } else if (!starryPeople[`${year}_${month - 3}`]) {
            // starryPeople에 가장 좌측 월 데이터가 없을 경우 해당 월 데이터를 가져옴
            await addStarryPeople(new Date(year, month - 2, 1), new Date(year, month - 1, 0))
        }
        return starryPeople
    }, [credential, year, month])

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

        if (credential?.token && starryPeopleResponse) {
            fetchProfile(Object.values(starryPeopleResponse))
        }
    }, [credential, starryPeopleResponse, timeType, year, month])

    async function addStarryPeople(fromDate: Date, toDate: Date) {
        await fetchStarryPeople(credential?.serverUrl, fromDate, toDate, timezone).then(res => {
            let starryPeopleTemp = { ...starryPeople }
            res.data.forEach((starryPerson: StarryPerson) => {
                starryPeopleTemp[`${starryPerson.year}_${starryPerson.month}`] = starryPerson
            })
            setStarryPeople(starryPeopleTemp)
        })
    }

    return (
        <>
            <Star
                organizationName={organization?.name}
                profileMap={profileMap}
                starryPeople={starryPeople}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
            ></Star>
        </>
    )
}
