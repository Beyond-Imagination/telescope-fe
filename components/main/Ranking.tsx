import { ICodeLineRanking, IRanking } from '../../temp/api/rankings'
import RankingTable from '../ranking/achievement/RankingTable'
import IndicatorSelector from './IndicatorSelector'
import React from 'react'
import CodeLineRankingTable from '../ranking/codeLine/CodeLineRankingTable'

interface IRankingProps {
    rankings?: IRanking[]
    codeLineRankings?: ICodeLineRanking[]
    profileMap: Map<string, string>
    indicatorType: any
    setIndicatorType: any
}

function Ranking({ rankings, codeLineRankings, profileMap, indicatorType, setIndicatorType }: IRankingProps) {
    return (
        <>
            <div className={`m-2 rankings`}>
                <div className={`flex justify-between mb-4`}>
                    <div>
                        <p className={`text-4xl m-1 font-bold`}>Ranking</p>
                    </div>
                    <IndicatorSelector indicatorType={indicatorType} setIndicatorType={setIndicatorType}></IndicatorSelector>
                </div>

                {indicatorType === 'Achievement' && <RankingTable rankings={rankings} profileMap={profileMap}></RankingTable>}
                {indicatorType === 'CodeLine' && <CodeLineRankingTable rankings={codeLineRankings} profileMap={profileMap}></CodeLineRankingTable>}
            </div>
        </>
    )
}

export default Ranking
