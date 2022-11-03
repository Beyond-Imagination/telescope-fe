import { IRanking } from '../../pages/api/rankings'
import { Chart } from 'react-google-charts'


interface IStackBarchart {
  ranking: IRanking
  maxValue: number
}

function StackBarchart({ ranking, maxValue = 0 }: IStackBarchart) {
  return (
    <Chart
      chartType="BarChart"
      data={[
        [
          'Name',
          'createIssue',
          { role: 'style' },
          'resolveIssue',
          { role: 'style' },
          'createCodeReview',
          { role: 'style' },
          'mergeMr',
          { role: 'style' },
        ],
        [
          'Score',
          ranking.score.createIssue,
          'color: #8000FF',
          ranking.score.resolveIssue,
          'color: #00FF38',
          ranking.score.createCodeReview,
          'color: #E9488B',
          ranking.score.mergeMr,
          'color: #3FF7C0',
        ],
      ]}
      width="100%"
      height="58px"
      options={{
        legend: 'none',
        isStacked: true,
        hAxis: {
          gridlines: {
            count: 0,
          },
          maxValue: maxValue,
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
        chartArea: { width: '100%', height: 18 },
        tooltip: {isHtml: true},
      }}
    />
  )
}

export default StackBarchart
