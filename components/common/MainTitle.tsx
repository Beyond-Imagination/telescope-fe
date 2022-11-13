import Image from 'next/image'
import LogoPic from '../../assets/logo.png'
import { IOrganization } from '../../types/organization'

export interface IType {
  name: string
  display: string
  color: string
  active: boolean
  priority: number
}

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
            <span
              className={`font-normal text-[21px] mr-3.5`}
              style={{ fontWeight: 600, color: 'white' }}
            >
              {organization?.name}
            </span>
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
              <span
                className={`font-normal text-[11.5px] mr-3.5`}
                style={{
                  fontWeight: 600,
                  letterSpacing: `-0.03rem`,
                }}
              >
                {tab.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MainTitle
