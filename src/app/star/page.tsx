'use client'

import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Star, { StarryPerson } from '../../../components/star/Star'
import { useCredential, useOrganization } from '@/hooks'
import { fetchStarryPeople } from '../../../utils/api/homeApi'

export default function StarPage() {
    const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, [])
    const [starryPeople, setStarryPeople] = useState<{ [key: string]: StarryPerson }>({})

    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())

    const credential = useCredential()
    const organization = useOrganization()

    const { data: starryPeopleResponse } = useQuery({
        queryKey: [credential?.serverUrl, month],
        queryFn: async () => await fetchStarryPeopleHook(),
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
                starryPeople={starryPeople}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
            ></Star>
        </>
    )
}
