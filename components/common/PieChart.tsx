import { Chart } from 'react-google-charts'

export function PieChart({ title, chartData, total, chartColors, legend, innerTextLeftPosition }: any) {
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
                        position: 'relative',
                        paddingLeft: '15px',
                        paddingRight: '140px',
                        textAlign: 'center',
                        display: 'flex',
                        top: '-130px',
                        left: innerTextLeftPosition || '0px',
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
                        {total ? total : 0}
                    </span>
                </div>
            </div>
        </div>
    )
}
