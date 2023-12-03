import Ranking from './Ranking'
import { ICodeLineRankingApi, IRankingApi } from '../../pages/api/rankings'
import { IType } from '../common/MainTitle'
import { IStatApi } from '../../types/stat'
import React, { useEffect } from 'react'
import RankingTop from '../ranking/achievement/RankingTop'
import DateSelector from './DateSelector'
import CodeLineRankingTop from '../ranking/codeLine/CodeLineRankingTop'

interface IDashboard {
    organization: any
    rankingsResponse?: IRankingApi
    codeLineRankingsResponse?: ICodeLineRankingApi
    summaryResponse?: IStatApi
    profileMap: Map<string, string>
    achieveTypes: IType[]
    codeLineTypes: IType[]
    setTimeType: any
    timeType: any
    indicatorType: any
    setIndicatorType: any
}

function Dashboard({
    organization,
    rankingsResponse,
    codeLineRankingsResponse,
    summaryResponse,
    profileMap,
    achieveTypes,
    codeLineTypes,
    timeType,
    setTimeType,
    indicatorType,
    setIndicatorType,
}: IDashboard) {
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
                {indicatorType === 'Achievement' && (
                    <RankingTop types={achieveTypes} rankings={rankingsResponse?.rankings} profileMap={profileMap}></RankingTop>
                )}
                {indicatorType === 'CodeLine' && (
                    <CodeLineRankingTop
                        types={codeLineTypes}
                        rankings={codeLineRankingsResponse?.codeLines}
                        profileMap={profileMap}
                    ></CodeLineRankingTop>
                )}
                <Ranking
                    rankings={rankingsResponse?.rankings}
                    codeLineRankings={codeLineRankingsResponse?.codeLines}
                    profileMap={profileMap}
                    indicatorType={indicatorType}
                    setIndicatorType={setIndicatorType}
                ></Ranking>
            </div>
        </div>
    )
}

export default Dashboard
