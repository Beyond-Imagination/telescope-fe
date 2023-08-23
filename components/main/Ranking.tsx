import { IRanking } from '../../pages/api/rankings'
import { IType } from '../common/MainTitle'
import RankingTitle from '../ranking/RankingTitle'
import RankingTable from '../ranking/RankingTable'

interface IRankingProps {
    rankings?: IRanking[]
    profileMap: Map<string, string>
}

function Ranking({ rankings, profileMap }: IRankingProps) {
    return (
        <>
            <p className={`text-4xl m-1 font-bold`}>Ranking</p>
            <div className={`m-2 rankings`}>
                <RankingTable rankings={rankings} profileMap={profileMap}></RankingTable>
            </div>
        </>
    )
}

export default Ranking
