import SummaryStat from './SummaryStat'
import Ranking from './Ranking'
import { IRankingApi } from '../../pages/api/rankings'
import { IType } from '../common/MainTitle'

interface IDashboard {
  rankingsResponse: IRankingApi
  types: IType[]
}

function Dashboard({ rankingsResponse, types }: IDashboard) {
  return (
    <div className={`flex pt-[26px] px-[55px]`}>
      <div className={`w-full`}>
        <SummaryStat
          total={1}
          create_issue={2}
          resolve_issue={3}
          create_code_review={4}
          merge_mr={5}
        ></SummaryStat>
        <Ranking types={types} rankings={rankingsResponse?.rankings}></Ranking>
      </div>
      {/*<div>*/}
      {/*  <PersonStat></PersonStat>*/}
      {/*</div>*/}
    </div>
  )
}

export default Dashboard
