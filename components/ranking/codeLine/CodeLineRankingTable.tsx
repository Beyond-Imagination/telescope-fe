import { ICodeLineRanking } from '../../../temp/api/rankings'
import CodeLineRankingTableRow from './CodeLineRankingTableRow'

interface IRankingTable {
    rankings?: ICodeLineRanking[]
    profileMap: Map<string, string>
}

const getRankingColor = (ranking: number) => {
    switch (ranking) {
        case 0:
            return `#E4BD31`
        case 1:
            return `#CCCCCC`
        case 2:
            return `#C88725`
        default:
            return `#999999`
    }
}

function CodeLineRankingTable({ rankings, profileMap }: IRankingTable) {
    return (
        <div className={`w-full h-full `}>
            <div className={``}>
                <div className={`grid grid-cols-12 gap-2`}>
                    <div className={`col-span-1`}>
                        <span className={`text-[#999999] text-[14px] font-bold`}>Rank</span>
                    </div>
                    <div className={`col-span-2`}>
                        <span className={`text-[#999999] text-[14px] font-bold`}>Members</span>
                    </div>
                    <div className={`col-span-6`}>
                        <span className={`text-[#999999] text-[14px] font-bold`}>Code Lines Rate</span>
                    </div>
                    <div className={`col-span-1`}>
                        <span className={`text-[#54B476] text-[14px] font-bold`}>Added</span>
                    </div>
                    <div className={`col-span-1`}>
                        <span className={`text-[#CB5A5D] text-[14px] font-bold`}>Deleted</span>
                    </div>
                    <div className={`col-span-1`}>
                        <span className={`text-[#999999] text-[14px] font-bold`}>Overall</span>
                    </div>
                </div>
            </div>
            <div className={`overflow-y-auto`}>
                {!rankings && <div className={`flex justify-center items-center py-4`}>Loading...</div>}
                {rankings && rankings.length === 0 && (
                    <>
                        {CodeLineRankingTableRow({
                            index: 0,
                            ranking: null,
                            rankingColor: getRankingColor(0),
                            maxValue: null,
                            imageSrc: null,
                        })}
                        {CodeLineRankingTableRow({
                            index: 1,
                            ranking: null,
                            rankingColor: getRankingColor(1),
                            maxValue: null,
                            imageSrc: null,
                        })}
                        {CodeLineRankingTableRow({
                            index: 2,
                            ranking: null,
                            rankingColor: getRankingColor(2),
                            maxValue: null,
                            imageSrc: null,
                        })}
                    </>
                )}
                {rankings &&
                    rankings?.map((ranking, index) =>
                        CodeLineRankingTableRow({
                            index: index,
                            ranking: ranking,
                            rankingColor: getRankingColor(index),
                            maxValue: rankings[0].codeLines.total,
                            imageSrc: profileMap.get(ranking.profilePicture),
                        }),
                    )}
            </div>
        </div>
    )
}

export default CodeLineRankingTable
