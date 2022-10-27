import { IRanking } from '../../pages/api/rankings'
import { IType } from '../common/MainTitle'
import RankingTitle from '../ranking/RankingTitle'
import RankingTable from '../ranking/RankingTable'

interface IRankingProps {
  rankings?: IRanking[]
  types: IType[]
}

function Ranking({ rankings, types }: IRankingProps) {
  return (
    <div className={`mb-2`}>
      <RankingTitle types={types}></RankingTitle>
      <RankingTable rankings={rankings}></RankingTable>
    </div>
  )
}

export default Ranking
