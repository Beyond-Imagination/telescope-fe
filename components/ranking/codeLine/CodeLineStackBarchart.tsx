import { ICodeLineRanking } from '../../../pages/api/rankings'
import { Chart } from 'react-google-charts'

interface IStackBarchart {
    ranking: ICodeLineRanking
    maxValue?: number
    options?: any
    annotation?: boolean
}

function CodeLineStackBarchart({ ranking, maxValue, options, annotation }: IStackBarchart) {
    return (
        <Chart
            chartType="BarChart"
            data={[
                [
                    'Name',
                    'addedLines',
                    { role: 'style' },
                    { role: 'tooltip' },
                    { role: 'annotation' },
                    'deletedLines',
                    { role: 'style' },
                    { role: 'tooltip' },
                    { role: 'annotation' },
                ],
                [
                    'Score',
                    ranking.codeLines.addedLines,
                    'color: #54B476',
                    'Added Lines : ' + ranking.codeLines.addedLines,
                    ranking.codeLines.addedLines > 0 && annotation ? ranking.codeLines.addedLines : null,
                    ranking.codeLines.deletedLines,
                    'color: #CB5A5D',
                    'Deleted Lines : ' + ranking.codeLines.deletedLines,
                    ranking.codeLines.deletedLines > 0 && annotation ? ranking.codeLines.deletedLines : null,
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

export default CodeLineStackBarchart
