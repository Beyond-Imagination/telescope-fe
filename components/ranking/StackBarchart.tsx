import { IRanking } from '../../pages/api/rankings'
import { Chart } from 'react-google-charts'

interface IStackBarchart {
    ranking: IRanking
    maxValue?: number
    options?: any
}

function StackBarchart({ ranking, maxValue, options }: IStackBarchart) {
    return (
        <Chart
            chartType="BarChart"
            data={[
                [
                    'Name',
                    'createIssue',
                    { role: 'style' },
                    { role: 'tooltip' },
                    'resolveIssue',
                    { role: 'style' },
                    { role: 'tooltip' },
                    'createCodeReview',
                    { role: 'style' },
                    { role: 'tooltip' },
                    'mergeMr',
                    { role: 'style' },
                    { role: 'tooltip' },
                    'receiveStar',
                    { role: 'style' },
                    { role: 'tooltip' },
                ],
                [
                    'Score',
                    ranking.score.createIssue,
                    'color: #F2994A',
                    'Create Issues : ' + ranking.score.createIssue,
                    ranking.score.resolveIssue,
                    'color: #2F80ED',
                    'Resolve Issues : ' + ranking.score.resolveIssue,
                    ranking.score.createCodeReview,
                    'color: #27AE60',
                    'Create Code Review : ' + ranking.score.createCodeReview,
                    ranking.score.mergeMr,
                    'color: #9B51E0',
                    'Merge MR : ' + ranking.score.mergeMr,
                    ranking.score.receiveStar,
                    'color: #F2C94C',
                    'Receive Star : ' + ranking.score.receiveStar,
                ],
            ]}
            width="100%"
            height={`${options?.height ? options.height : 28}px`}
            options={{
                legend: 'none',
                isStacked: true,
                hAxis: {
                    gridlines: {
                        count: 0,
                    },
                    textPosition: 'none',
                    baselineColor: 'transparent',
                    viewWindow: { max: maxValue ? maxValue : null },
                },
                vAxis: {
                    baselineColor: 'transparent',
                    gridlines: {
                        count: 0,
                    },
                    textPosition: 'none',
                },
                chartArea: {
                    width: '100%',
                    height: '100%',
                },
                tooltip: { isHtml: true },
                backgroundColor: 'transparent',
            }}
        />
    )
}

export default StackBarchart
