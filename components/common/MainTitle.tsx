import Typography from '../typography'
import Image from 'next/image'
import LogoPic from '../../assets/logo.png'
import { IOrganization } from '../../types/organization'
import styled from 'styled-components'
import { useState } from 'react'

export interface IType {
  name: string
  display: string
  color: string
  active: boolean
  priority: number
}

const OrgTitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 25px;
  color: #ffffff;
`

const TabTitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 11.5px;
  line-height: 14px;

  text-align: center;
  letter-spacing: -0.03rem;
`

interface IMainTitle {
  organization?: IOrganization
  selectTab?: any
  selectedTab?: any
}

const tabData = [
  {
    id: 1,
    title: 'Leaderboard',
  },
  { id: 2, title: 'My Score' },
]

function MainTitle({ organization, selectTab, selectedTab }: IMainTitle) {
  return (
    <div
      className={`px-[55px] py-[16px] border-b border-[#BCBCBC] flex justify-between bg-[#23222C] relative`}
    >
      <div className={`flex items-center `}>
        <div className={`w-[59px] h-[59px] mr-[20px]`}>
          <Image src={LogoPic} alt={`logo`}></Image>
        </div>
        <div className={`flex flex-col`}>
          <div className={`mb-0.5`}>
            <OrgTitle>{organization?.name}</OrgTitle>
          </div>
        </div>
      </div>
      <div className={`absolute right-10 flex bottom-0 `}>
        {tabData.map((tab) => {
          return (
            <div
              key={tab.id}
              className={`w-[124px] py-[5px] flex justify-center hover:cursor-pointer`}
              onClick={() => selectTab(tab.id)}
              style={
                tab.id === selectedTab
                  ? {
                      borderBottomWidth: 2,
                      borderColor: 'white',
                      color: 'white',
                    }
                  : {
                      borderBottomWidth: 2,
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'rgba(255, 255, 255, 0.2)',
                    }
              }
            >
              <TabTitle>{tab.title}</TabTitle>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default MainTitle
