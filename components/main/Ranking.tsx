import { IRanking } from '../../pages/api/rankings'
import { Chart } from 'react-google-charts'
import Jdenticon from 'react-jdenticon'

interface IRankingProps {
  rankings: IRanking[]
}

function Ranking({ rankings }: IRankingProps) {
  if (!rankings) {
    return null
  }
  return (
    <div
      className={`w-full h-full shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)] rounded px-9`}
    >
      <div className={`flex gap-[53px] px-[26px]`}>
        <div className={`w-[76px] flex justify-end`}>Ranking</div>
        <div className={`w-[168px]`}>Name</div>
        <div className={`w-[300px]`}>Productivity</div>
        <div className={`w-[90px]`}>Score</div>
      </div>
      {rankings.map((value, index) => (
        <div
          key={value.name}
          className={`gap-[53px] flex items-center p-[26px]`}
        >
          <div className={`w-[76px] flex items-center justify-between`}>
            <div className={`bg-gray-500 w-4 h-4`}></div>
            <div>{index + 1}</div>
          </div>
          <div className={`flex w-[168px] gap-1`}>
            <div>
              <Jdenticon size="48" value={value.name} />
            </div>
            <div>
              <div className={`font-bold`}>{value.name}</div>
              <div>{value.name}</div>
            </div>
          </div>
          <div className={`flex w-[300px]`}>
            <Chart
              chartType="BarChart"
              data={[
                ['Name', 'Score', { role: 'style' }],
                ['total', value.score.total, 'color: #387AF1'],
                [
                  'create_code_review',
                  value.score.create_code_review,
                  'color: #8000FF',
                ],
                ['create_issue', value.score.create_issue, 'color: #00FF38'],
                ['merge_mr', value.score.merge_mr, 'color: #3FF7C0'],
                ['resolve_issue', value.score.resolve_issue, 'color: #E9488B'],
              ]}
              width="300px"
              height="58px"
              options={{
                legend: 'none',
                hAxis: {
                  gridlines: {
                    count: 0,
                  },
                  textPosition: 'none',
                  baselineColor: 'transparent',
                },
                vAxis: {
                  baselineColor: 'transparent',
                  gridlines: {
                    count: 0,
                  },
                  textPosition: 'none',
                },
                bar: {
                  groupWidth: '55%',
                },
                chartArea: { width: '100%', height: '100%' },
              }}
            />
          </div>
          <div className={`flex w-[90px]`}>{value.score.total}</div>
        </div>
      ))}
    </div>
  )
}

export default Ranking
