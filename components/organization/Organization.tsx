import { Chart } from 'react-google-charts'
import { PieChart } from '../common/PieChart'
import { ScoreBoard, TotalScoreBoard } from '../common/ScoreBoard'
import DateSelector from '../main/DateSelector'
import React from 'react'

export default function Organization({ organizationName, summaryResponse, rankingsResponse, scoreListResponse, timeType, setTimeType }: any) {
    const colors: any = {
        createIssue: '#F2994A',
        createCodeReview: '#2F80ED',
        codeReviewDiscussion: '#C34ED7',
        receiveStar: '#F2C94C',
        resolveIssue: '#9B51E0',
        mergeMr: '#27AE60',
        acceptCodeReview: '#56CCF2',
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

    if (rankingsResponse?.rankings && rankingsResponse.rankings.length > 0) {
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

    let max = 1
    for (let date in scoreListResponse) {
        let scores: any[] = [date]
        let sum = 0
        for (let i in keys) {
            const score = scoreListResponse[date][keys[i]] || 0
            sum += score
            scores.push(score)
        }
        max = Math.max(sum, max)
        data.push(scores)
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
            viewWindow: {
                max: max, // max 값이 없으면 데이터가 없을때 최소값이 적용되지 않음
                min: 0,
            },
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
                <div className={`flex justify-between mb-4`}>
                    <div>
                        <span className={`font-bold text-[32px] text-[#999999]`}>{organizationName || 'Telescope'}</span>
                    </div>
                    <DateSelector setTimeType={setTimeType} timeType={timeType}></DateSelector>
                </div>

                <div>
                    <p className={`text-4xl m-1 mb-2 font-bold`}>Organization Score</p>
                    <div className="flex flex-row">
                        <div className="basis-1/4  gap-2">
                            <TotalScoreBoard score={summaryResponse ? summaryResponse.score.total : 0} />
                        </div>
                        <div className="basis-3/4  gap-2">
                            <div className="grid grid-cols-4 gap-2">
                                <ScoreBoard
                                    color={colors.createIssue}
                                    score={summaryResponse ? summaryResponse.score.createIssue : 0}
                                    title={'Create<br/>Issues'}
                                />
                                <ScoreBoard
                                    color={colors.createCodeReview}
                                    score={summaryResponse ? summaryResponse.score.createCodeReview : 0}
                                    title={'Create<br/>Code Review'}
                                />
                                <ScoreBoard
                                    color={colors.codeReviewDiscussion}
                                    score={summaryResponse?.score?.codeReviewDiscussion || 0}
                                    title={'Code Review<br/>Discussion'}
                                />
                                <ScoreBoard
                                    color={colors.receiveStar}
                                    score={summaryResponse ? summaryResponse.score.receiveStar : 0}
                                    title={'Receive<br/>Star'}
                                />
                                <ScoreBoard
                                    color={colors.resolveIssue}
                                    score={summaryResponse ? summaryResponse.score.resolveIssue : 0}
                                    title={'Resolve<br/>issues'}
                                />
                                <ScoreBoard
                                    color={colors.mergeMr}
                                    score={summaryResponse ? summaryResponse.score.mergeMr : 0}
                                    title={'Merge<br/>MR'}
                                />
                                <ScoreBoard
                                    color={colors.acceptCodeReview}
                                    score={summaryResponse?.score?.acceptCodeReview || 0}
                                    title={'Accept<br/>Code Review'}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <p className={`text-4xl m-1 mt-8 font-bold`}>Index Chart</p>
                    <div
                        className={'justify-between h-[280px]'}
                        style={{
                            marginTop: '36px',
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
                            legend="right"
                            innerTextLeftPosition={-23}
                        ></PieChart>

                        <PieChart
                            title="User Score"
                            chartData={userChartData}
                            total={summaryResponse?.score?.total}
                            chartColors={rankingsResponse?.rankings?.length > 0 ? null : ['#eeeeee']}
                            legend="right"
                            innerTextLeftPosition={-23}
                        ></PieChart>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <p className={`text-4xl m-1 mt-4 font-bold`}>Daily Activity</p>
                    <Chart chartType="ColumnChart" width="100%" height="200px" data={data} options={options} />
                </div>
            </div>
        </div>
    )
}
