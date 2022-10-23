import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import MainTitle, { IType } from '../components/common/MainTitle'
import Dashboard from '../components/main/Dashboard'
import { useQuery } from '@tanstack/react-query'
import { IRankingApi } from './api/rankings'
import axios from '../utils/api'
import { IStatApi } from '../types/stat'

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
  const [userTokenData, setUserTokenData] = useState()
  const { data: rankingsResponse } = useQuery([types], () => fetchUsers())
  const { data: summaryResponse } = useQuery(['week'], () => fetchSummaryStats())  

  if (process.env.NODE_ENV == 'production') {
    console.log('Production Mode')
  } else if (process.env.NODE_ENV == 'development') {
    console.log('Development Mode')
  }

  const fetchUsers = () => axios.get<IRankingApi>('api/rankings')
  const fetchSummaryStats = () => axios.get<IStatApi>('api/organization/score',
  { params: {serverUrl: "https://beyond-imagination.jetbrains.space"}})

  useEffect(() => {
    getUserAccessTokenData(true).then((v: any) => setUserTokenData(v))
  }, [])
  console.log('userTokenData: ', userTokenData)
  return (
    <>
      <MainTitle></MainTitle>
      {(
        <Dashboard
          rankingsResponse={rankingsResponse?.data}
          summaryResponse={summaryResponse?.data}
          types={types}
        ></Dashboard>
      )}
    </>
  )
}

export default Home
