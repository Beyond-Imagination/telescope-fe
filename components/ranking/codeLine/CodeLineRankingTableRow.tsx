import CodeLineStackBarchart from './CodeLineStackBarchart'
import { ICodeLineRanking } from '../../../temp/api/rankings'
import ProfilePicture from '@/components/atom/ProfilePicture'

interface RankingTableRowProps {
    index: any
    ranking: ICodeLineRanking | null
    rankingColor: any
    maxValue: any
}
const CodeLineRankingTableRow = ({ index, ranking, rankingColor, maxValue }: RankingTableRowProps) => {
    return (
        <div key={index} className={`flex mb-4`}>
            <div className={`flex flex-1 items-center grid grid-cols-12 gap-2`}>
                <div className={`col-span-1 flex items-center`}>
                    <div className={`flex items-center`}>
                        <div>
                            <span
                                className={`text-[32px] font-normal`}
                                style={{
                                    color: rankingColor,
                                }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`flex col-span-2`}>
                    <div className={`mr-2`}>
                        <ProfilePicture
                            className="w-12 h-12 rounded-3xl"
                            profilePicture={ranking?.profilePicture}
                            name={ranking?.name}
                            jdenticonSize={40}
                        />
                    </div>
                    <div className={`items-center flex`}>
                        <span
                            className={`text-[14px] font-medium`}
                            style={{
                                color: rankingColor,
                            }}
                        >
                            {ranking?.name ? ranking?.name : 'None'}
                        </span>
                    </div>
                </div>
                <div className={`flex col-span-6 pr-2`}>
                    {ranking ? (
                        <CodeLineStackBarchart maxValue={maxValue} ranking={ranking}></CodeLineStackBarchart>
                    ) : (
                        <div
                            style={{
                                boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.25) inset, 0px -2px 6px 0px rgba(255, 255, 255, 0.25) inset;',
                                background: '#FFF',
                                borderRadius: '4px',
                                width: '100%',
                                height: '16px',
                            }}
                        ></div>
                    )}
                </div>
                <div className={`flex col-span-1 text-[24px] justify-self-center`}>
                    <span
                        style={{
                            color: rankingColor,
                        }}
                    >
                        {ranking?.codeLines?.total ? String(ranking?.codeLines.addedLines).padStart(2, '0') : 0}
                    </span>
                </div>
                <div className={`flex col-span-1 text-[24px] justify-self-center`}>
                    <span
                        style={{
                            color: rankingColor,
                        }}
                    >
                        {ranking?.codeLines?.total ? String(ranking?.codeLines.deletedLines).padStart(2, '0') : 0}
                    </span>
                </div>
                <div className={`flex col-span-1 text-[24px] justify-self-center`}>
                    <span
                        style={{
                            color: rankingColor,
                        }}
                    >
                        {ranking?.codeLines?.total ? String(ranking?.codeLines.total).padStart(2, '0') : 0}
                    </span>
                </div>
            </div>
            <div className={`w-2.5  mb-1 rounded-r-xl`}></div>
        </div>
    )
}

export default CodeLineRankingTableRow
