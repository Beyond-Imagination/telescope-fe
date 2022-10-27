import type { NextPage } from 'next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import qs from 'qs'
import MainTitle, { IType } from '../components/common/MainTitle'
import Dashboard from '../components/main/Dashboard'
import { useQuery } from '@tanstack/react-query'
import { IRankingApi } from './api/rankings'
import axios from '../utils/api'
import { IStatApi } from '../types/stat'
import { IUserToken } from '../types/auth'
import { convertDateByType, dateToString } from '../utils/date'

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
    name: 'type0',
    display: 'See All',
    color: '#387AF1',
    active: true,
    priority: 0,
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

  if (process.env.NODE_ENV == 'production') {
    console.log('Production Mode')
  } else if (process.env.NODE_ENV == 'development') {
    console.log('Development Mode')
  }

  let date = new Date()

  const fetchRankings = useCallback(() => {
    if (userTokenData)
      return axios.get<IRankingApi>(
        `api/organization/rankings?serverUrl=${encodeURIComponent(
          userTokenData.serverUrl
        )}&from=${dateToString(
          convertDateByType(timeType, date)
        )}&to=${dateToString(date)}`
      )
  }, [userTokenData, timeType])
  const fetchSummaryStats = useCallback(() => {
    if (userTokenData)
      return axios.get<IStatApi>(
        `api/organization/score?serverUrl=${encodeURIComponent(
          userTokenData.serverUrl
        )}&from=${dateToString(
          convertDateByType(timeType, date)
        )}&to=${dateToString(date)}`
      )
  }, [userTokenData, timeType])

  useEffect(() => {
    getUserAccessTokenData(true).then((v: any) => setUserTokenData(v))
  }, [])

  useEffect(() => {}, [timeType])

  return (
    <>
      <MainTitle></MainTitle>
      <Dashboard
        rankingsResponse={rankingsResponse?.data}
        summaryResponse={summaryResponse?.data}
        types={types}
        timeType={timeType}
        setTimeType={setTimeType}
      ></Dashboard>
    </>
  )
}

export default Home
