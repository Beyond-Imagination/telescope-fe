import Image from 'next/image'
import LogoPic from '../../assets/logo.png'
import { IOrganization } from '../../types/space'

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
  { id: 2, title: 'Organization' },
  { id: 3, title: 'My Score' },
]

function MainTitle({ organization, selectTab, selectedTab }: IMainTitle) {
  return (
    <div
      className={`px-[55px] py-[16px] flex justify-between relative`}
    >
      <div className={`flex items-center `}>
        <span
          className={`font-normal text-[21px] mr-3.5`}
          style={{ fontWeight: 600, color: 'grey' }}
        >
          Telescope
        </span>
      </div>

      <div>
      {/*  star 개수 표시 */}
      </div>

      <div className={`absolute right-10 flex bottom-0 `}>
        {tabData.map((tab) => {
          return (
            <div
              key={tab.id}
              className={`w-[124px] py-[16px] flex justify-center hover:cursor-pointer`}
              onClick={() => selectTab(tab.id)}
              style={
                 {
                   color: tab.id === selectedTab ? 'black' : 'lightgray',
                   borderBottom: tab.id === selectedTab ? '3px solid' : '',
                   backgroundColor: 'white',
                   borderRadius: '4px 4px 0 0',
                 }
              }
            >
              <span
                className={`font-normal text-[15px]`}
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
