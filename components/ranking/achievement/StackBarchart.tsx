import { IRanking } from '../../../temp/api/rankings'
import { Chart } from 'react-google-charts'

interface IStackBarchart {
    ranking: IRanking
    maxValue?: number
    options?: any
    annotation?: boolean
}

function StackBarchart({ ranking, maxValue, options, annotation }: IStackBarchart) {
    return (
        <Chart
            chartType="BarChart"
            data={[
                [
                    'Name',
                    'createIssue',
                    { role: 'style' },
                    { role: 'tooltip' },
                    { role: 'annotation' },
                    'resolveIssue',
                    { role: 'style' },
                    { role: 'tooltip' },
                    { role: 'annotation' },
                    'createCodeReview',
                    { role: 'style' },
                    { role: 'tooltip' },
                    { role: 'annotation' },
                    'mergeMr',
                    { role: 'style' },
                    { role: 'tooltip' },
                    { role: 'annotation' },
                    'codeReviewDiscussion',
                    { role: 'style' },
                    { role: 'tooltip' },
                    { role: 'annotation' },
                    'acceptCodeReview',
                    { role: 'style' },
                    { role: 'tooltip' },
                    { role: 'annotation' },
                    'receiveStar',
                    { role: 'style' },
                    { role: 'tooltip' },
                    { role: 'annotation' },
                ],
                [
                    'Score',
                    ranking.score.createIssue,
                    'color: #F2994A',
                    'Create Issues : ' + ranking.score.createIssue,
                    ranking.score.createIssue > 0 && annotation ? ranking.score.createIssue : null,
                    ranking.score.resolveIssue,
                    'color: #9B51E0',
                    'Resolve Issues : ' + ranking.score.resolveIssue,
                    ranking.score.resolveIssue > 0 && annotation ? ranking.score.resolveIssue : null,
                    ranking.score.createCodeReview,
                    'color: #2F80ED',
                    'Create Code Review : ' + ranking.score.createCodeReview,
                    ranking.score.createCodeReview > 0 && annotation ? ranking.score.createCodeReview : null,
                    ranking.score.mergeMr,
                    'color: #27AE60',
                    'Merge MR : ' + ranking.score.mergeMr,
                    ranking.score.mergeMr > 0 && annotation ? ranking.score.mergeMr : null,
                    ranking.score.codeReviewDiscussion,
                    'color: #C34ED7',
                    'Code Review Discussion: ' + ranking.score.codeReviewDiscussion,
                    ranking.score.codeReviewDiscussion > 0 && annotation ? ranking.score.codeReviewDiscussion : null,
                    ranking.score.acceptCodeReview,
                    'color: #56CCF2',
                    'Accept Code Review: ' + ranking.score.acceptCodeReview,
                    ranking.score.acceptCodeReview > 0 && annotation ? ranking.score.acceptCodeReview : null,
                    ranking.score.receiveStar,
                    'color: #F2C94C',
                    'Receive Star : ' + ranking.score.receiveStar,
                    ranking.score.receiveStar > 0 && annotation ? ranking.score.receiveStar : null,
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
                ...options,
            }}
        />
    )
}

export default StackBarchart
