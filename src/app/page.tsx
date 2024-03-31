'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import DateSelector from '../../components/main/DateSelector'
import { ScoreBoard } from '../../components/common/ScoreBoard'
import { PieChart } from '../../components/common/PieChart'
import { MilkyWay } from '../../components/common/MilkyWay'
import { fetchCodeLinesByUserId, fetchScoreByUserId, fetchScoreListByUserId } from '../../utils/api/myScoreApi'
import { convertDateByType } from '../../utils/date'
import * as spaceAPI from '../../utils/api/spaceApi'
import { useTimeTypeStore } from '@/store/TimeTypeStore'
import ProfilePicture from '@/components/atom/ProfilePicture'
import { useCredential } from '@/hooks'

export default function Home() {
    const [userTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const timeType = useTimeTypeStore(state => state.timeType)

    const credential = useCredential()
    let fromDate = new Date()

    const { data: userData } = useQuery({
        queryKey: ['profile', 'me', credential ? credential.token : null],
        queryFn: () => fetchProfileMe(),
        enabled: !!credential?.serverUrl && !!credential?.token,
    })

    const { data: scoreDataResponse } = useQuery({
        queryKey: ['score', timeType],
        queryFn: () => fetchScoreByUserIdHook(),
        enabled: !!userData?.id,
    })
    const scoreData = scoreDataResponse?.data

    const { data: codeLineDataResponse } = useQuery({
        queryKey: ['codeLine', timeType],
        queryFn: () => fetchCodeLineByUserIdHook(),
        enabled: !!userData?.id,
    })
    const codeLineData = codeLineDataResponse?.data

    const { data: scoreListResponse } = useQuery({
        queryKey: ['userScoreList'],
        queryFn: () => fetchScoreListByUserIdHook(),
        enabled: !!credential?.serverUrl && !!userData?.id,
    })
    const scoreList = scoreListResponse?.data

    const fetchProfileMe = useCallback(() => {
        if (credential?.token) return spaceAPI.getMe(credential.serverUrl, credential.token)
    }, [credential])

    const fetchScoreByUserIdHook = useCallback(() => {
        if (credential?.token && userData)
            return fetchScoreByUserId(userData.id, credential.serverUrl, convertDateByType(timeType, fromDate), userTimezone)
    }, [credential, userData, timeType, userTimezone])

    const fetchCodeLineByUserIdHook = useCallback(() => {
        if (credential?.token && userData)
            return fetchCodeLinesByUserId(userData.id, credential.serverUrl, convertDateByType(timeType, fromDate), userTimezone)
    }, [credential, userData, timeType, userTimezone])

    const fetchScoreListByUserIdHook = useCallback(() => {
        if (credential?.token && userData) return fetchScoreListByUserId(userData.id, credential.serverUrl, userTimezone)
    }, [credential, userData, userTimezone])

    useEffect(() => {}, [timeType])
    const colors: any = {
        createIssue: '#F2994A',
        createCodeReview: '#2F80ED',
        codeReviewDiscussion: '#C34ED7',
        receiveStar: '#F2C94C',
        resolveIssue: '#9B51E0',
        mergeMr: '#27AE60',
        acceptCodeReview: '#56CCF2',
        addedLines: '#54B476',
        deletedLines: '#CB5A5D',
    }

    const myScoreChartData = []
    let myScoreChartColors = []
    myScoreChartData.push(['Achievement', 'Score']) // not displayed in PI chart
    if (scoreData?.score && scoreData.score.total) {
        for (let key in scoreData.score) {
            if (key !== 'total') {
                myScoreChartData.push([key, scoreData.score[key]])
                myScoreChartColors.push(colors[key])
            }
        }
    } else {
        // user의 score 정보가 존재하지 않을 경우
        myScoreChartData.push(['', '1'])
        myScoreChartColors = ['#eeeeee']
    }
    const myCodeLineChartData = []
    let myCodeLineChartColors = []
    myCodeLineChartData.push(['Type', 'Lines'])
    if (codeLineData?.codeLines && codeLineData.codeLines.total) {
        for (let key in codeLineData.codeLines) {
            if (key !== 'total') {
                myCodeLineChartData.push([key, codeLineData.codeLines[key]])
                myCodeLineChartColors.push(colors[key])
            }
        }
    } else {
        // user의 codeLine 정보가 존재하지 않을 경우
        myCodeLineChartData.push(['', '1'])
        myCodeLineChartColors = ['#eeeeee']
    }

    return (
        <div className={`flex pt-6 px-6 flex-col`}>
            <div className={`w-full`}>
                <div className={`flex justify-between`}>
                    <div className={`flex`}>
                        <span>
                            <ProfilePicture
                                className="rounded-3xl w-12 h-12"
                                profilePicture={userData?.profilePicture}
                                name={userData?.name ? `${userData.name.firstName} ${userData.name.lastName}` : ''}
                                jdenticonSize={40}
                            />
                        </span>
                        <span className={`font-normal text-[32px] color-[#23222c] mx-2`} style={{ fontWeight: 600 }}>
                            {userData?.name ? `${userData.name.firstName} ${userData.name.lastName}` : 'Nickname'}
                        </span>
                    </div>
                    <DateSelector></DateSelector>
                </div>

                <p className={`text-4xl m-1 mb-2 font-bold`}>My Score</p>
                <div className="flex flex-row">
                    <div className="basis-1/4  gap-2">
                        <PieChart
                            chartData={myScoreChartData ? myScoreChartData : null}
                            total={scoreData ? scoreData.score.total : 0}
                            chartColors={myScoreChartColors}
                            legend="none"
                            innerTextLeftPosition="65px"
                        />
                    </div>
                    <div className="basis-3/4  gap-2">
                        <div className="grid grid-cols-4 gap-2">
                            <ScoreBoard color={colors.createIssue} score={scoreData ? scoreData.score.createIssue : 0} title="Create<br/>Issues" />
                            <ScoreBoard
                                color={colors.createCodeReview}
                                score={scoreData ? scoreData.score.createCodeReview : 0}
                                title="Create<br/>Code Review"
                            />
                            <ScoreBoard
                                color={colors.codeReviewDiscussion}
                                score={scoreData?.score?.codeReviewDiscussion || 0}
                                title="Code Review<br/>Discussion"
                            />
                            <ScoreBoard color={colors.receiveStar} score={scoreData ? scoreData.score.receiveStar : 0} title="Receive<br/>Star" />
                            <ScoreBoard color={colors.resolveIssue} score={scoreData ? scoreData.score.resolveIssue : 0} title="Resolve<br/>issues" />
                            <ScoreBoard color={colors.mergeMr} score={scoreData ? scoreData.score.mergeMr : 0} title="Merge<br/>MR" />
                            <ScoreBoard
                                color={colors.acceptCodeReview}
                                score={scoreData?.score?.acceptCodeReview || 0}
                                title="Accept<br/>Code Review"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row" style={{ marginTop: '0.5rem' }}>
                    <div className="basis-1/4  gap-2">
                        <PieChart
                            chartData={myCodeLineChartData ? myCodeLineChartData : null}
                            total={codeLineData ? codeLineData.codeLines.total : 0}
                            chartColors={myCodeLineChartColors}
                            legend="none"
                            innerTextLeftPosition="65px"
                        />
                    </div>
                    <div className="basis-3/4 gap-2">
                        <div className="grid grid-cols-4 gap-2">
                            <ScoreBoard
                                color={colors.addedLines}
                                score={codeLineData ? codeLineData.codeLines.addedLines : 0}
                                title="Added<br/>Lines"
                            />
                            <ScoreBoard
                                color={colors.deletedLines}
                                score={codeLineData ? codeLineData.codeLines.deletedLines : 0}
                                title="Deleted<br/>Lines"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <MilkyWay scoreList={scoreList} />
        </div>
    )
}
