import type { NextPage } from 'next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import MainTitle, { IType } from '../components/common/MainTitle'
import Dashboard from '../components/main/Dashboard'
import { useQuery } from '@tanstack/react-query'
import { IRankingApi } from './api/rankings'
import axios from '../utils/api'
import { IStatApi } from '../types/stat'
import { IUserToken } from '../types/auth'
import { convertDateByType, dateToString } from '../utils/date'
import * as spaceAPI from '../utils/api/space'
import Personal from '../components/personal'

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
]

function getUserAccessTokenData(askForConsent: any) {
  return new Promise((resolve) => {
    // 1. Create a MessageChannel
    const channel = new MessageChannel()
    // 2. Subscribe to response
    channel.port1.onmessage = (e) => resolve(e.data)
    // 3. Call postMessage
    window.parent.postMessage(
      {
        type: 'GetUserTokenRequest',
        permissionScope: 'global:Profile.View global:Profile.Memberships.View',
        askForConsent: askForConsent,
      },
      '*',
      [channel.port2]
    )
  })
}

const Home: NextPage = () => {
  const [types] = useState(initialTypes)
  const [userTokenData, setUserTokenData] = useState<IUserToken>()
  const [selectedTab, selectTab] = useState<number>(1)

  const [timeType, setTimeType] = useState('week')
  const { data: rankingsResponse } = useQuery(
    [timeType, userTokenData?.serverUrl, 'ranking'],
    () => fetchRankings(),
    {
      enabled: !!userTokenData?.serverUrl,
    }
  )
  const { data: summaryResponse } = useQuery(
    [timeType, userTokenData?.serverUrl, 'stat'],
    () => fetchSummaryStats(),
    {
      enabled: !!userTokenData?.serverUrl,
    }
  )
  const { data: organization } = useQuery(
    [userTokenData?.serverUrl, 'organization'],
    () => fetchOrganization(),
    {
      enabled: userTokenData?.token !== '',
    }
  )

  let fromDate = new Date()
  let tomorrow = new Date()
  tomorrow.setDate(fromDate.getDate() + 1)

  const fetchRankings = useCallback(() => {
    if (userTokenData)
      return axios.get<IRankingApi>(
        `api/organization/rankings?serverUrl=${encodeURIComponent(
          userTokenData.serverUrl
        )}&from=${dateToString(
          convertDateByType(timeType, fromDate)
        )}&to=${dateToString(tomorrow)}`
      )
  }, [userTokenData, timeType])
  const fetchSummaryStats = useCallback(() => {
    if (userTokenData)
      return axios.get<IStatApi>(
        `api/organization/score?serverUrl=${encodeURIComponent(
          userTokenData.serverUrl
        )}&from=${dateToString(
          convertDateByType(timeType, fromDate)
        )}&to=${dateToString(tomorrow)}`
      )
  }, [userTokenData, timeType])
  const fetchOrganization = useCallback(() => {
    if (userTokenData?.token)
      return spaceAPI.getOrganization(
        userTokenData.serverUrl,
        userTokenData.token
      )
  }, [userTokenData])

  useEffect(() => {
    getUserAccessTokenData(true).then((data: any) => setUserTokenData(data))
  }, [])
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setUserTokenData({
        serverUrl: 'https://beyond-imagination.jetbrains.space',
        token: process.env.SPACE_ACCESS_TOKEN || '',
      })
    }
  }, [])

  useEffect(() => {}, [timeType])
  return (
    <>
      <MainTitle
        organization={organization?.data}
        selectedTab={selectedTab}
        selectTab={selectTab}
      ></MainTitle>
      {selectedTab == 1 && (
        <Dashboard
          rankingsResponse={rankingsResponse?.data}
          summaryResponse={summaryResponse?.data}
          types={types}
          timeType={timeType}
          setTimeType={setTimeType}
        ></Dashboard>
      )}
      {selectedTab == 2 && (
        <Personal timeType={timeType} setTimeType={setTimeType}></Personal>
      )}

      <div className={`flex justify-center text-[#D9D9D9]`}>
        <span>ⓒ 2022 Beyond_Imagaination All Rights Reserved. </span>
      </div>
    </>
  )
}

export default Home
