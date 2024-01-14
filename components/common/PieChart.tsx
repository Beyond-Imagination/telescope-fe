import { Chart } from 'react-google-charts'

export function PieChart({ title, chartData, total, chartColors, legend }: any) {
    const pieOptions = {
        legend: legend ? legend : 'right',
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
    // legend를 고려해서 조금더 오른쪽으로 치우치게 수정
    let transform = 'translate(-40%, -50%)'
    let left = '30%'
    if (legend == 'none') {
        // legend가 없으면 가운데에 표시
        transform = 'translate(-50%, -50%)'
        left = '50%'
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <span>{title}</span>
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Chart chartType="PieChart" width="100%" height="100%" data={chartData} options={pieOptions} />
                <div
                    style={{
                        zIndex: 2,
                        position: 'absolute',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        top: '50%',
                        left: left,
                        transform: transform,
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
                        {total ? total : 0}
                    </span>
                </div>
            </div>
        </div>
    )
}
