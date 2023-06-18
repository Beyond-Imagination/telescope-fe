import { IRanking } from '../../pages/api/rankings'
import Jdenticon from 'react-jdenticon'
import StackBarchart from './StackBarchart'
import { useEffect, useState } from 'react'

interface IRankingTop {
  rankings?: IRanking[]
  profileMap: Map<string, string>
}

function RankingTop({ rankings, profileMap }: IRankingTop) {
  const top3Ranking = rankings?.slice(0, 3)
  const rankingStyle: { [key: number]: any } = {
    0: {
      textColor: '#FFFFFF',
      bgColor:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%), #E4BD31',
      border: `1px solid rgba(0, 0, 0, 0.05)`,
    },
    1: {
      textColor: '#999999',
      bgColor:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%), #DDDDDD',
      border: '1px solid rgba(0, 0, 0, 0.05)',
    },
    2: {
      textColor: '#FFFFFF',
      bgColor:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), #A9630E',
      border: '1px solid rgba(0, 0, 0, 0.05)',
    },
  }
  return (
    <div className={`flex gap-8`}>
      {top3Ranking?.map((ranking, index) => {
        return (
          <div
            key={index}
            className={`w-[280px] rounded-[24px] text-[${rankingStyle[index].textColor}] py-2.5`}
            style={{
              background: `${rankingStyle[index].bgColor}`,
              border: `${rankingStyle[index].border}`,
            }}
          >
            <div className={`flex justify-between px-4`}>
              <div className={`text-[56px]`}>0{index + 1}</div>
              <div className={`flex items-start`}>
                <div className={`mr-2`}>overall</div>
                <div
                  className={`text-[32px] flex`}
                  style={{ lineHeight: '100%' }}
                >
                  {ranking.score.total}
                </div>
              </div>
            </div>
            <div className={`flex px-4 py-2 items-center`}>
              <div className={`mr-2`}>
                {ranking.profilePicture ? (
                  <img
                    className={`rounded-[20px]`}
                    src={profileMap.get(ranking.profilePicture)}
                    style={{ height: 48, width: 48 }}
                    alt="picture"
                  />
                ) : (
                  <Jdenticon size="50" value={ranking.name} />
                )}
              </div>
              <div className={`test-[16px] font-bold`}>{ranking.name}</div>
            </div>
            <div className={`flex`}>
              <StackBarchart
                options={{
                  height: 40,
                  annotations: {
                    textStyle: {
                      fontSize: 12,
                      color: '#000000', // Label text color
                    },
                  },
                }}
                ranking={ranking}
              ></StackBarchart>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RankingTop
