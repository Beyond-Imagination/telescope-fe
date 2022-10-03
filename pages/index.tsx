import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import MainTitle, { IType } from '../components/common/MainTitle'
import Dashboard from '../components/main/Dashboard'

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
    display: 'Merge MR',
    color: '#3FF7C0',
    active: true,
    priority: 3,
  },
  {
    name: 'type4',
    display: 'Create Code Review',
    color: '#E9488B',
    active: true,
    priority: 4,
  },
]

const Home: NextPage = () => {
  const [types, setTypes] = useState(initialTypes)

  return (
    <>
      <MainTitle types={types} setTypes={setTypes}></MainTitle>
      <Dashboard></Dashboard>
    </>
  )
}

export default Home
