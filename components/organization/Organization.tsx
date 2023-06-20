import { Chart } from 'react-google-charts'
import { PieChart } from '../common/PieChart'
import { ScoreBoard, TotalScoreBoard } from '../common/ScoreBoard'
import DateSelector from '../main/DateSelector'
import React from 'react'

export default function Organization({ organizationName, summaryResponse, rankingsResponse, scoreListResponse, timeType, setTimeType }: any) {
    const colors: any = {
        createIssue: '#F2994A',
        resolveIssue: '#2F80ED',
        createCodeReview: '#27AE60',
        mergeMr: '#9B51E0',
        receiveStar: '#F2C94C',
    }
    const teamChartData = [['Achievement', 'Score']]
    let teamChartColors = []

    if (summaryResponse?.score && summaryResponse.score.total) {
        for (let key in summaryResponse.score) {
            if (key !== 'total') {
                teamChartData.push([key, summaryResponse.score[key]])
                teamChartColors.push(colors[key])
            }
        }
    } else {
        teamChartData.push(['', '1'])
        teamChartColors = ['#eeeeee']
    }

    const userChartData = [['user', 'Score']]

    if (rankingsResponse?.rankings) {
        for (let key in rankingsResponse.rankings) {
            const user = rankingsResponse.rankings[key]
            userChartData.push([user?.name, user?.score?.total])
        }
    } else {
        userChartData.push(['', '1'])
    }

    const keys = Object.keys(colors)
    let data = [keys.slice()]
    const barCharColors = keys.map(key => colors[key])
    data[0].splice(0, 0, 'Date')

    for (let date in scoreListResponse) {
        let score: any[] = [date]
        for (let i in keys) {
            score.push(scoreListResponse[date][keys[i]])
        }
        data.push(score)
    }

    const options = {
        legend: 'none',
        bar: { groupWidth: '40%' },
        isStacked: true,
        chartArea: {
            left: 40,
            bottom: 20,
            top: 10,
            right: 0,
        },
        vAxis: {
            minorGridlines: {
                color: 'transparent',
            },
            format: '0',
        },
        colors: barCharColors,
    }

    return (
        <div className={`flex pt-6 px-6 flex-col`}>
            <div className={`w-full`}>
                <div>
                    <span className={`text-[14px] text-[#999999]`}>Ranking</span>
                </div>
                <div className={`flex justify-between`}>
                    <div>
                        <span className={`font-bold text-[32px]`}>{organizationName ? organizationName : 'Telescope'}</span>
                    </div>
                    <DateSelector setTimeType={setTimeType} timeType={timeType}></DateSelector>
                </div>
                <div className={`flex-1 scoreFrame`} style={{ justifyContent: 'space-between' }}>
                    <div>
                        <div className={`grid grid-cols-4 gap-2`}>
                            <TotalScoreBoard score={summaryResponse ? summaryResponse.score.total : 0} />
                            <ScoreBoard
                                color={colors.createIssue}
                                score={summaryResponse ? summaryResponse.score.createIssue : 0}
                                title={'Create<br/>Issues'}
                            />
                            <ScoreBoard
                                color={colors.resolveIssue}
                                score={summaryResponse ? summaryResponse.score.resolveIssue : 0}
                                title={'Resolve<br/>issues'}
                            />
                            <ScoreBoard
                                color={colors.createCodeReview}
                                score={summaryResponse ? summaryResponse.score.createCodeReview : 0}
                                title={'Create<br/>Code'}
                            />
                            <ScoreBoard color={colors.mergeMr} score={summaryResponse ? summaryResponse.score.mergeMr : 0} title={'Merge<br/>MR'} />
                            <ScoreBoard
                                color={colors.receiveStar}
                                score={summaryResponse ? summaryResponse.score.receiveStar : 0}
                                title={'Receive<br/>Star'}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={'justify-between h-[350px] w-[680px]'}
                    style={{
                        marginTop: '24px',
                        display: 'flex',
                        fontSize: '14px',
                        justifyContent: 'space-between',
                        color: '#999999',
                        fontWeight: 500,
                    }}
                >
                    <PieChart
                        title="Team Score"
                        chartData={teamChartData}
                        total={summaryResponse?.score?.total}
                        chartColors={teamChartColors}
                    ></PieChart>

                    <PieChart
                        title="User Score"
                        chartData={userChartData}
                        total={summaryResponse?.score?.total}
                        chartColors={rankingsResponse?.rankings ? null : ['#eeeeee']}
                    ></PieChart>
                </div>

                <div style={{ width: '100%' }}>
                    <Chart chartType="ColumnChart" width="100%" height="200px" data={data} options={options} />
                </div>
            </div>
        </div>
    )
}
