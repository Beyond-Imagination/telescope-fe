import { ICodeLineRanking } from '../../../temp/api/rankings'
import CodeLineRankingTopCard from './CodeLineRankingTopCard'
import { IType } from '../../common/MainTitle'
import RankingTitle from '../RankingTitle'

interface IRankingTop {
    types: IType[]
    rankings?: ICodeLineRanking[]
}

function CodeLineRankingTop({ types, rankings }: IRankingTop) {
    const top3Ranking = rankings?.slice(0, 3)

    return (
        <>
            <p className={`text-4xl m-1 mb-2 font-bold`}>Top 3</p>
            <div className={`flex gap-8`} style={{ justifyContent: 'center' }}>
                {CodeLineRankingTopCard({
                    style: {
                        textColor: '#FFF',
                        bgColor: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%), #E4BD31',
                        border: `1px solid rgba(0, 0, 0, 0.05)`,
                    },
                    ranking: top3Ranking ? top3Ranking[0] : null,
                    index: 1,
                })}
                {CodeLineRankingTopCard({
                    style: {
                        textColor: '#999999',
                        bgColor: 'linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%), #DDDDDD',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                    },
                    ranking: top3Ranking ? top3Ranking[1] : null,
                    index: 2,
                })}
                {CodeLineRankingTopCard({
                    style: {
                        textColor: '#FFF',
                        bgColor: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), #A9630E',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                    },
                    ranking: top3Ranking ? top3Ranking[2] : null,
                    index: 3,
                })}
            </div>
            <RankingTitle types={types}></RankingTitle>
        </>
    )
}

export default CodeLineRankingTop
