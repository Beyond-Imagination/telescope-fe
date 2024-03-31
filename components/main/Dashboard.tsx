import Ranking from './Ranking'
import { ICodeLineRankingApi, IRankingApi } from '../../temp/api/rankings'
import { IType } from '../common/MainTitle'
import { IStatApi } from '../../types/stat'
import React, { useEffect } from 'react'
import RankingTop from '../ranking/achievement/RankingTop'
import DateSelector from './DateSelector'
import CodeLineRankingTop from '../ranking/codeLine/CodeLineRankingTop'
import { useTimeTypeStore } from '@/store/TimeTypeStore'

interface IDashboard {
    organization: any
    rankingsResponse?: IRankingApi
    codeLineRankingsResponse?: ICodeLineRankingApi
    summaryResponse?: IStatApi
    achieveTypes: IType[]
    codeLineTypes: IType[]
    indicatorType: any
    setIndicatorType: any
}

function Dashboard({
    organization,
    rankingsResponse,
    codeLineRankingsResponse,
    summaryResponse,
    achieveTypes,
    codeLineTypes,
    indicatorType,
    setIndicatorType,
}: IDashboard) {
    const timeType = useTimeTypeStore(state => state.timeType)

    useEffect(() => {
        return () => {}
    }, [rankingsResponse, summaryResponse, timeType])

    return (
        <div className={`flex pt-6 px-6`}>
            <div className={`w-full`}>
                <div className={`flex justify-between mb-4`}>
                    <div>
                        <span className={`font-bold text-[32px] text-[#999999]`}>{organization?.name ? organization?.name : 'Telescope'}</span>
                    </div>
                    <DateSelector></DateSelector>
                </div>
                {indicatorType === 'Achievement' && <RankingTop types={achieveTypes} rankings={rankingsResponse?.rankings}></RankingTop>}
                {indicatorType === 'CodeLine' && (
                    <CodeLineRankingTop types={codeLineTypes} rankings={codeLineRankingsResponse?.codeLines}></CodeLineRankingTop>
                )}
                <Ranking
                    rankings={rankingsResponse?.rankings}
                    codeLineRankings={codeLineRankingsResponse?.codeLines}
                    indicatorType={indicatorType}
                    setIndicatorType={setIndicatorType}
                ></Ranking>
            </div>
        </div>
    )
}

export default Dashboard
