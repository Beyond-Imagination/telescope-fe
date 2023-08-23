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

function Dashboard({ organization, rankingsResponse, summaryResponse, profileMap, types, timeType, setTimeType }: IDashboard) {
    useEffect(() => {
        return () => {}
    }, [rankingsResponse, summaryResponse, timeType])

    // 하위 버전 호환용. v1.1.0 배포 이후 삭제
    rankingsResponse?.rankings.forEach(ranking => {
        ranking.score.codeReviewDiscussion = ranking.score.codeReviewDiscussion || 0
        ranking.score.acceptCodeReview = ranking.score.acceptCodeReview || 0
    })

    return (
        <div className={`flex pt-6 px-6`}>
            <div className={`w-full`}>
                <div className={`flex justify-between mb-4`}>
                    <div>
                        <span className={`font-bold text-[32px] text-[#999999]`}>{organization?.name ? organization?.name : 'Telescope'}</span>
                    </div>
                    <DateSelector setTimeType={setTimeType} timeType={timeType}></DateSelector>
                </div>
                <RankingTop types={types} rankings={rankingsResponse?.rankings} profileMap={profileMap}></RankingTop>
                <Ranking rankings={rankingsResponse?.rankings} profileMap={profileMap}></Ranking>
            </div>
        </div>
    )
}

export default Dashboard
