import SummaryStat from './SummaryStat'
import PersonStat from './PersonStat'
import Ranking from './Ranking'
import { IRankingApi } from '../../pages/api/rankings'

interface IDashboard {
  rankingsResponse: IRankingApi
}

function Dashboard({ rankingsResponse }: IDashboard) {
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
        <Ranking rankings={rankingsResponse?.rankings}></Ranking>
      </div>
      {/*<div>*/}
      {/*  <PersonStat></PersonStat>*/}
      {/*</div>*/}
    </div>
  )
}

export default Dashboard
