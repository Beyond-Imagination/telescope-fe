import { IRanking } from '../../../pages/api/rankings'
import RankingTableRow from './RankingTableRow'

interface IRankingTable {
    rankings?: IRanking[]
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

function RankingTable({ rankings, profileMap }: IRankingTable) {
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
                    <div className={`col-span-8`}>
                        <span className={`text-[#999999] text-[14px] font-bold`}>Productivity Rate</span>
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
                        {RankingTableRow({
                            index: 0,
                            ranking: null,
                            rankingColor: getRankingColor(0),
                            maxValue: null,
                            imageSrc: null,
                        })}
                        {RankingTableRow({
                            index: 1,
                            ranking: null,
                            rankingColor: getRankingColor(1),
                            maxValue: null,
                            imageSrc: null,
                        })}
                        {RankingTableRow({
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
                        RankingTableRow({
                            index: index,
                            ranking: ranking,
                            rankingColor: getRankingColor(index),
                            maxValue: rankings[0].score.total,
                            imageSrc: profileMap.get(ranking.profilePicture),
                        }),
                    )}
            </div>
        </div>
    )
}

export default RankingTable
