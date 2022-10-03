import SummaryStat from './SummaryStat'
import PersonStat from './PersonStat'
import Ranking from './Ranking'

function Dashboard() {
  return (
    <div className={`flex pt-[26px] px-[55px] gap-[14px]`}>
      <div className={`w-[869px]`}>
        <SummaryStat></SummaryStat>
        <Ranking></Ranking>
      </div>
      <div>
        <PersonStat></PersonStat>
      </div>
    </div>
  )
}

export default Dashboard
