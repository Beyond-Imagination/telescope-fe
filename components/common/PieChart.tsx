import { Chart } from 'react-google-charts'

export function PieChart({ score, title }: any) {
    const colors: any = {
        createIssue: '#F2994A',
        resolveIssue: '#2F80ED',
        createCodeReview: '#27AE60',
        mergeMr: '#9B51E0',
        receiveStar: '#F2C94C',
        unknown: '#56CCF2',
    }
    const charData = [['Achievement', 'Score']]
    let chartColors: string[] = []
    if (score && score.total) {
        for (let key in score) {
            if (key !== 'total') {
                charData.push([key, score[key]])
                chartColors.push(colors[key])
            }
        }
    } else {
        charData.push(['', '1'])
        chartColors = ['#eeeeee']
    }

    const pieOptions = {
        legend: 'none',
        pieSliceText: 'none',
        pieHole: 0.75,
        enableInteractivity: false,
        chartArea: {
            width: '100%',
            height: '100%',
        },
        colors: chartColors,
        is3D: false,
    }
    return (
        <div className={'h-[260px] w-[240px]'}>
            <span>{title}</span>
            <div>
                <Chart chartType="PieChart" width="240px" height="240px" data={charData} options={pieOptions} />
                <div
                    style={{
                        position: 'relative',
                        textAlign: 'center',
                        display: 'flex',
                        top: '-150px',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <span
                        style={{
                            fontSize: '12px',
                        }}
                    >
                        Total Score
                    </span>

                    <span
                        style={{
                            lineHeight: 1,
                            fontWeight: 300,
                            fontSize: '44px',
                            color: '#333333',
                        }}
                    >
                        {score ? score.total : 0}
                    </span>
                </div>
            </div>
        </div>
    )
}
