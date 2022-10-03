import SummaryStat from './SummaryStat'
import PersonStat from './PersonStat'
import Ranking from './Ranking'
import { IRankingApi } from '../../pages/api/rankings'

interface IDashboard {
  rankingsResponse: IRankingApi
}

function Dashboard({ rankingsResponse }: IDashboard) {
  return (
    <div className={`flex pt-[26px] px-[55px] gap-[14px]`}>
      <div className={`w-[869px]`}>
        <SummaryStat></SummaryStat>
        <Ranking rankings={rankingsResponse?.rankings}></Ranking>
      </div>
      <div>
        <PersonStat></PersonStat>
      </div>
    </div>
  )
}

export default Dashboard
