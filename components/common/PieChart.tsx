import { Chart } from 'react-google-charts'

export function PieChart({ title, chartData, total, chartColors }: any) {
    const pieOptions = {
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
        <div className={'h-[350px] w-[330px]'}>
            <span>{title}</span>
            <div>
                <Chart chartType="PieChart" width="330px" height="330px" data={chartData} options={pieOptions} />
                <div
                    style={{
                        position: 'relative',
                        paddingLeft: '15px',
                        paddingRight: '140px',
                        textAlign: 'center',
                        display: 'flex',
                        top: '-195px',
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
