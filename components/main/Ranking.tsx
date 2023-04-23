import { IRanking } from '../../pages/api/rankings'
import { IType } from '../common/MainTitle'
import RankingTitle from '../ranking/RankingTitle'
import RankingTable from '../ranking/RankingTable'

interface IRankingProps {
  rankings?: IRanking[]
  profileMap: Map<string, string>
  types: IType[]
}

function Ranking({ rankings, types, profileMap }: IRankingProps) {
  return (
    <div className={`mb-2 rankings`}>
      <RankingTitle types={types}></RankingTitle>
      <RankingTable rankings={rankings} profileMap={profileMap}></RankingTable>
    </div>
  )
}

export default Ranking
