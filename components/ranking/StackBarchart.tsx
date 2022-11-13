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
          { role: 'tooltip'},
          'resolveIssue',
          { role: 'style' },
          { role: 'tooltip'},
          'createCodeReview',
          { role: 'style' },
          { role: 'tooltip'},
          'mergeMr',
          { role: 'style' },
          { role: 'tooltip'},
        ],
        [
          'Score',
          ranking.score.createIssue,
          'color: #8000FF',
          'Create Issues : '+ ranking.score.createIssue,
          ranking.score.resolveIssue,
          'color: #00FF38',
          'Resolve Issues : '+ ranking.score.resolveIssue,
          ranking.score.createCodeReview,
          'color: #E9488B',
          'Create Code Review : '+ ranking.score.createCodeReview,
          ranking.score.mergeMr,
          'color: #3FF7C0',
          'Merge MR : '+ ranking.score.mergeMr,
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
        tooltip: { isHtml: true },
      }}
    />
  )
}

export default StackBarchart
