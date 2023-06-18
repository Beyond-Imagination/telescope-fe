import Jdenticon from 'react-jdenticon'
import { IRanking } from '../../pages/api/rankings'
import StackBarchart from './StackBarchart'

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
                {rankings && rankings.length == 0 && <div className={`flex justify-center items-center py-4`}>No Data...</div>}
                {rankings &&
                    rankings?.map((ranking, index) => (
                        <div key={index} className={`flex`}>
                            <div key={ranking.name} className={`flex flex-1 items-center grid grid-cols-12 gap-2`}>
                                <div className={`col-span-1 flex items-center`}>
                                    <div className={`flex items-center`}>
                                        <div>
                                            <span
                                                className={`text-[32px] font-normal`}
                                                style={{
                                                    color: getRankingColor(index),
                                                }}
                                            >
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`flex col-span-2`}>
                                    <div className={`mr-2`}>
                                        {ranking.profilePicture ? (
                                            <img
                                                className={`rounded-[20px]`}
                                                src={profileMap.get(ranking.profilePicture)}
                                                style={{
                                                    height: 40,
                                                    width: 40,
                                                }}
                                                alt="picture"
                                            />
                                        ) : (
                                            <Jdenticon size="40" value={ranking.name} />
                                        )}
                                    </div>
                                    <div className={`items-center flex`}>
                                        <span
                                            className={`text-[14px] font-medium`}
                                            style={{
                                                color: getRankingColor(index),
                                            }}
                                        >
                                            {ranking.name}
                                        </span>
                                    </div>
                                </div>
                                <div className={`flex col-span-8 pr-2`}>
                                    <StackBarchart maxValue={rankings[0].score.total} ranking={ranking}></StackBarchart>
                                </div>
                                <div className={`flex col-span-1 text-[24px]`}>
                                    <span
                                        style={{
                                            color: getRankingColor(index),
                                        }}
                                    >
                                        {String(ranking.score.total).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                            <div className={`w-2.5  mb-1 rounded-r-xl`}></div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default RankingTable
