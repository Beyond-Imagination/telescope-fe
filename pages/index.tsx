import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import MainTitle, { IType } from '../components/common/MainTitle'
import Dashboard from '../components/main/Dashboard'
import { useQuery } from '@tanstack/react-query'
import { IUserToken } from '../types/auth'
import { convertDateByType } from '../utils/date'
import * as spaceAPI from '../utils/api/spaceApi'
import Personal from '../components/personal'
import {
  fetchRankings,
  fetchSummaryStats,
  fetchProfileImage,
} from '../utils/api/homeApi'
import { getUserAccessTokenData } from '../utils/api/spaceApi'

const initialTypes: IType[] = [
  {
    name: 'type1',
    display: 'Create Issues',
    color: '#8000FF',
    active: true,
    priority: 1,
  },
  {
    name: 'type2',
    display: 'Resolve Issues',
    color: '#00FF38',
    active: true,
    priority: 2,
  },
  {
    name: 'type3',
    display: 'Create Code Review',
    color: '#E9488B',
    active: true,
    priority: 3,
  },
  {
    name: 'type4',
    display: 'Merge MR',
    color: '#3FF7C0',
    active: true,
    priority: 4,
  },
  {
    name: 'type5',
    display: 'Receive Star',
    color: '#F7CD3F',
    active: true,
    priority: 5,
  },
]

const Home: NextPage = () => {
  const [types] = useState(initialTypes)
  const [userTokenData, setUserTokenData] = useState<IUserToken>()
  const [selectedTab, selectTab] = useState<number>(1)
  const [profileMap, setProfileMap] = useState(new Map())

  const [timeType, setTimeType] = useState('week')
  const { data: rankingsResponse } = useQuery(
    [timeType, userTokenData?.serverUrl, 'ranking'],
    () => fetchRankingsHook(),
    {
      enabled: !!userTokenData?.serverUrl,
    }
  )
  const { data: summaryResponse } = useQuery(
    [timeType, userTokenData?.serverUrl, 'stat'],
    () => fetchSummaryStatsHook(),
    {
      enabled: !!userTokenData?.serverUrl,
    }
  )
  const { data: organization } = useQuery(
    [userTokenData?.serverUrl, 'organization'],
    () => fetchOrganizationHook(),
    {
      enabled: !!userTokenData?.token,
    }
  )

  let today = new Date()

  const fetchRankingsHook = useCallback(() => {
    if (userTokenData)
      return fetchRankings(
        userTokenData.serverUrl,
        convertDateByType(timeType, today)
      )
  }, [userTokenData, timeType])

  const fetchSummaryStatsHook = useCallback(() => {
    if (userTokenData)
      return fetchSummaryStats(
        userTokenData.serverUrl,
        convertDateByType(timeType, today)
      )
  }, [userTokenData, timeType])

  const fetchOrganizationHook = useCallback(() => {
    if (userTokenData?.token)
      return spaceAPI.getOrganization(
        userTokenData.serverUrl,
        userTokenData.token
      )
  }, [userTokenData])

  useEffect(() => {
    async function fetchProfile(rankings: any[]) {
      const promises = rankings.map((ranking) => {
        return new Promise<void>(async (resolve, reject) => {
          if (
            ranking.profilePicture &&
            !profileMap.has(ranking.profilePicture)
          ) {
            const profile = await fetchProfileImage(
              userTokenData?.serverUrl as string,
              userTokenData?.token as string,
              ranking.profilePicture
            )
            setProfileMap(
              // @ts-ignore
              (prev) => new Map([...prev, [ranking.profilePicture, profile]])
            )
            resolve()
          }
        })
      })
      await Promise.all(promises)
    }
    if (userTokenData?.token && rankingsResponse) {
      fetchProfile(rankingsResponse.data.rankings)
    }
  }, [userTokenData, rankingsResponse, timeType])

  //development 환경에서는 bi 통계 데이터 나오게 강제 출력 (Only *개발*)
  useEffect(() => {
    getUserAccessTokenData(true).then((data: any) => {
      setUserTokenData(data)
    })
  }, [])

  //development 환경에서는 bi 통계 데이터 나오게 강제 출력 (Only *개발*)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setUserTokenData({
        serverUrl: 'https://beyond-imagination.jetbrains.space',
        token: process.env.SPACE_ACCESS_TOKEN || '',
      })
    }
  }, [])

  //timeType이 변경될 경우, ReRendering
  useEffect(() => {}, [timeType])
  return (
    <>
      <MainTitle
        organization={organization}
        selectedTab={selectedTab}
        selectTab={selectTab}
      ></MainTitle>
      {selectedTab == 1 && (
        <Dashboard
          rankingsResponse={rankingsResponse?.data}
          summaryResponse={summaryResponse?.data}
          profileMap={profileMap}
          types={types}
          timeType={timeType}
          setTimeType={setTimeType}
        ></Dashboard>
      )}
      {selectedTab == 2 && (
        <Personal
          userTokenData={userTokenData}
          profileMap={profileMap}
          timeType={timeType}
          setTimeType={setTimeType}
        ></Personal>
      )}

      <div className={`flex justify-center text-[#D9D9D9]`}>
        <span>ⓒ 2022 Beyond_Imagination All Rights Reserved. </span>
      </div>
    </>
  )
}

export default Home
