import SummaryStat from './SummaryStat'
import Ranking from './Ranking'
import { IRankingApi } from '../../pages/api/rankings'
import { IType } from '../common/MainTitle'
import { IStatApi } from '../../types/stat'
import React, { useEffect } from 'react'
import RankingTop from '../ranking/RankingTop'
import DateSelector from './DateSelector'

interface IDashboard {
  organization: any
  rankingsResponse?: IRankingApi
  summaryResponse?: IStatApi
  profileMap: Map<string, string>
  types: IType[]
  setTimeType: any
  timeType: any
}

function Dashboard({
  organization,
  rankingsResponse,
  summaryResponse,
  profileMap,
  types,
  timeType,
  setTimeType,
}: IDashboard) {
  useEffect(() => {
    return () => {}
  }, [rankingsResponse, summaryResponse, timeType])
  return (
    <div className={`flex pt-6 px-6`}>
      <div className={`w-full`}>
        <div>
          <span className={`text-[14px] text-[#999999]`}>Ranking</span>
        </div>
        <div className={`flex justify-between`}>
          <div>
            <span className={`font-bold text-[32px]`}>
              {organization?.name ? organization?.name : 'Telescope'}
            </span>
          </div>
          <DateSelector
            setTimeType={setTimeType}
            timeType={timeType}
          ></DateSelector>
        </div>
        <RankingTop
          rankings={rankingsResponse?.rankings}
          profileMap={profileMap}
        ></RankingTop>
        <Ranking
          types={types}
          rankings={rankingsResponse?.rankings}
          profileMap={profileMap}
        ></Ranking>
      </div>
    </div>
  )
}

export default Dashboard
