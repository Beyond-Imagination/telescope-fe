import type { NextPage } from 'next'
import { useState } from 'react'
import MainTitle, { IType } from '../components/common/MainTitle'
import Dashboard from '../components/main/Dashboard'
import { useQuery } from '@tanstack/react-query'
import { IRankingApi } from './api/rankings'
import axios from '../utils/api'

const initialTypes: IType[] = [
  {
    name: 'type0',
    display: 'See All',
    color: '#387AF1',
    active: true,
    priority: 0,
  },
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

const Home: NextPage = () => {
  const [types] = useState(initialTypes)
  const { data: rankingsResponse } = useQuery([types], () => fetchUsers())

  const fetchUsers = () => axios.get<IRankingApi>('api/rankings')
  return (
    <>
      <MainTitle></MainTitle>
      {rankingsResponse && (
        <Dashboard
          rankingsResponse={rankingsResponse?.data}
          types={types}
        ></Dashboard>
      )}
    </>
  )
}

export default Home
