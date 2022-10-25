import SummaryStat from './SummaryStat'
import Ranking from './Ranking'
import { IRankingApi } from '../../pages/api/rankings'
import { IType } from '../common/MainTitle'
import { IStatApi } from '../../types/stat'

interface IDashboard {
  rankingsResponse?: IRankingApi
  summaryResponse?: IStatApi
  types: IType[]
}

function Dashboard({ rankingsResponse, summaryResponse, types }: IDashboard) {
  return (
    <div className={`flex pt-[26px] px-[55px]`}>
      <div className={`w-full`}>
        <SummaryStat
          total={summaryResponse?.score.total}
          create_issue={summaryResponse?.score.createIssue}
          resolve_issue={summaryResponse?.score.resolveIssue}
          create_code_review={summaryResponse?.score.createCodeReview}
          merge_mr={summaryResponse?.score.mergeMr}
        ></SummaryStat>
        <Ranking types={types} rankings={rankingsResponse?.rankings}></Ranking>
      </div>
    </div>
  )
}

export default Dashboard
