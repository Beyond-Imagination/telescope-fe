import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import MainTitle, { IType } from '../components/common/MainTitle'
import Dashboard from '../components/main/Dashboard'
import { useQuery } from '@tanstack/react-query'
import { IUserToken } from '../types/auth'
import { convertDateByType } from '../utils/date'
import * as spaceAPI from '../utils/api/spaceApi'
import { getUserAccessTokenData } from '../utils/api/spaceApi'
import Personal from '../components/personal'
import {
    fetchProfileImage,
    fetchRankings,
    fetchScoreList,
    fetchSummaryStats,
    fetchRemainStar,
    fetchStarryPeople,
    fetchCodeLinesRankings,
} from '../utils/api/homeApi'
import Organization from '../components/organization/Organization'
import { useInterval } from 'use-interval'
import { fetchCodeLinesByUserId, fetchScoreByUserId, fetchScoreListByUserId } from '../utils/api/myScoreApi'
import Star, { StarryPerson } from '../components/star/Star'
import NoContentPopup from '../components/common/NoContentPopup'

const initialAchieveTypes: IType[] = [
    {
        name: 'type1',
        display: 'Create Issues',
        color: '#F2994A',
        active: true,
        priority: 1,
    },
    {
        name: 'type2',
        display: 'Resolve Issues',
        color: '#9B51E0',
        active: true,
        priority: 2,
    },
    {
        name: 'type3',
        display: 'Create Code Review',
        color: '#2F80ED',
        active: true,
        priority: 3,
    },
    {
        name: 'type4',
        display: 'Merge MR',
        color: '#27AE60',
        active: true,
        priority: 4,
    },
    {
        name: 'type5',
        display: 'Code Review Discussion',
        color: '#C34ED7',
        active: true,
        priority: 5,
    },
    {
        name: 'type6',
        display: 'Accept Code Review',
        color: '#56CCF2',
        active: true,
        priority: 6,
    },
    {
        name: 'type7',
        display: 'Receive Star',
        color: '#F2C94C',
        active: true,
        priority: 7,
    },
]

const initialCodeTypes: IType[] = [
    {
        name: 'type1',
        display: 'Added Code',
        color: '#54B476',
        active: true,
        priority: 1,
    },
    {
        name: 'type2',
        display: 'Deleted Code',
        color: '#CB5A5D',
        active: true,
        priority: 2,
    },
]

const Home: NextPage = () => {
    const [achieveTypes] = useState(initialAchieveTypes)
    const [codeLineTypes] = useState(initialCodeTypes)
    const [userTokenData, setUserTokenData] = useState<IUserToken>()
    const [selectedTab, selectTab] = useState<number>(1)
    const [profileMap, setProfileMap] = useState(new Map())
    const [userTimezone, setUserTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [timeType, setTimeType] = useState('week')
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())
    const [starryPeople, setStarryPeople] = useState<{ [key: string]: StarryPerson }>({})
    const [indicatorType, setIndicatorType] = useState('Achievement')
    // 모달 버튼 클릭 유무를 저장할 state
    const [showModal, setShowModal] = useState(false)
    // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    let today = new Date()
    useEffect(() => {
        // 컴포넌트가 마운트될 때 한 번만 실행될 코드 작성

        if (!!userTokenData?.serverUrl) {
            fetchSummaryStats(userTokenData?.serverUrl, convertDateByType('year', today), userTimezone).then(res => {
                // 1년치 데이터가 없을 경우 모달을 띄움
                if (!res.data.score?.total) {
                    setShowModal(true)
                }
            })
        }
    }, [userTokenData])

    const { data: rankingsResponse } = useQuery([timeType, userTokenData?.serverUrl, 'ranking'], () => fetchRankingsHook(), {
        enabled: !!userTokenData?.serverUrl,
    })
    const { data: codeLineRankingsResponse } = useQuery([timeType, userTokenData?.serverUrl, 'codeLineRankings'], () => fetchCodeLineRankingsHook(), {
        enabled: !!userTokenData?.serverUrl,
    })
    const { data: summaryResponse } = useQuery([timeType, userTokenData?.serverUrl, 'stat'], () => fetchSummaryStatsHook(), {
        enabled: !!userTokenData?.serverUrl,
    })
    const { data: organization } = useQuery([userTokenData?.serverUrl, 'organization'], () => fetchOrganizationHook(), {
        enabled: !!userTokenData?.token,
    })
    const { data: scoreListResponse } = useQuery([userTokenData?.serverUrl, 'scoreList'], () => fetchScoreListHook(), {
        enabled: !!userTokenData?.serverUrl,
    })

    const fetchRankingsHook = useCallback(() => {
        if (userTokenData) return fetchRankings(userTokenData.serverUrl, convertDateByType(timeType, today), userTimezone)
    }, [userTokenData, timeType, userTimezone])

    const fetchCodeLineRankingsHook = useCallback(() => {
        if (userTokenData) return fetchCodeLinesRankings(userTokenData.serverUrl, convertDateByType(timeType, today), userTimezone)
    }, [userTokenData, timeType, userTimezone])

    const fetchSummaryStatsHook = useCallback(() => {
        if (userTokenData) return fetchSummaryStats(userTokenData.serverUrl, convertDateByType(timeType, today), userTimezone)
    }, [userTokenData, timeType, userTimezone])

    const fetchScoreListHook = useCallback(() => {
        if (userTokenData) return fetchScoreList(userTokenData.serverUrl, userTimezone)
    }, [userTokenData, userTimezone])

    const fetchOrganizationHook = useCallback(() => {
        if (userTokenData?.token) return spaceAPI.getOrganization(userTokenData.serverUrl, userTokenData.token)
    }, [userTokenData])

    const { data: userData } = useQuery(['profile', 'me', userTokenData ? userTokenData.token : null], () => fetchProfileMe(), {
        enabled: !!userTokenData?.serverUrl && !!userTokenData?.token,
    })

    const { data: userScoreData } = useQuery(['score', timeType], () => fetchScoreByUserIdHook(), {
        enabled: !!userData?.id,
    })
    const { data: userCodeLineData } = useQuery(['codeLine', timeType], () => fetchCodeLineByUserIdHook(), {
        enabled: !!userData?.id,
    })

    const { data: userScoreListResponse } = useQuery(['userScoreList'], () => fetchScoreListByUserIdHook(), {
        enabled: !!userTokenData?.serverUrl && !!userData?.id,
    })

    const { data: remainStarResponse } = useQuery([userTokenData?.serverUrl, 'remainStar'], () => fetchRemainStarHook(), {
        enabled: !!userTokenData?.serverUrl && !!userData?.id,
    })

    const { data: starryPeopleResponse } = useQuery([userTokenData?.serverUrl, month], async () => await fetchStarryPeopleHook(), {
        enabled: !!userTokenData?.serverUrl,
    })

    const fetchProfileMe = useCallback(() => {
        if (userTokenData?.token) return spaceAPI.getMe(userTokenData.serverUrl, userTokenData.token)
    }, [userTokenData])

    let fromDate = new Date()

    const fetchScoreByUserIdHook = useCallback(() => {
        if (userTokenData?.token && userData)
            return fetchScoreByUserId(userData.id, userTokenData.serverUrl, convertDateByType(timeType, fromDate), userTimezone)
    }, [userTokenData, userData, timeType, userTimezone])

    const fetchCodeLineByUserIdHook = useCallback(() => {
        if (userTokenData?.token && userData)
            return fetchCodeLinesByUserId(userData.id, userTokenData.serverUrl, convertDateByType(timeType, fromDate), userTimezone)
    }, [userTokenData, userData, timeType, userTimezone])

    const fetchScoreListByUserIdHook = useCallback(() => {
        if (userTokenData?.token && userData) return fetchScoreListByUserId(userData.id, userTokenData.serverUrl, userTimezone)
    }, [userTokenData, userData, userTimezone])

    const fetchRemainStarHook = useCallback(() => {
        if (userTokenData && userData) return fetchRemainStar(userTokenData.serverUrl, userData.id, userTimezone)
    }, [userTokenData, userData, userTimezone, userTimezone])

    const fetchStarryPeopleHook = useCallback(async () => {
        if (userTokenData?.serverUrl) {
            if (Object.keys(starryPeople).length === 0) {
                // starryPeople가 비어있을 경우 최근 3개월 데이터를 가져옴
                await addStarryPeople(new Date(year, month - 2, 1), new Date(year, month, 0))
            } else if (!starryPeople[`${year}_${month - 3}`]) {
                // starryPeople에 가장 좌측 월 데이터가 없을 경우 해당 월 데이터를 가져옴
                await addStarryPeople(new Date(year, month - 2, 1), new Date(year, month - 1, 0))
            }
        }
        return starryPeople
    }, [userTokenData, year, month, userTimezone])

    async function addStarryPeople(fromDate: Date, toDate: Date) {
        await fetchStarryPeople(userTokenData!.serverUrl, fromDate, toDate, userTimezone).then(res => {
            let starryPeopleTemp = { ...starryPeople }
            res.data.forEach((starryPerson: StarryPerson) => {
                starryPeopleTemp[`${starryPerson.year}_${starryPerson.month}`] = starryPerson
            })
            setStarryPeople(starryPeopleTemp)
        })
    }

    useEffect(() => {
        async function fetchProfile(users: any[]) {
            const promises = users.map(user => {
                return new Promise<void>(async (resolve, reject) => {
                    if (user.profilePicture && !profileMap.has(user.profilePicture)) {
                        const profile = await fetchProfileImage(
                            userTokenData?.serverUrl as string,
                            userTokenData?.token as string,
                            user.profilePicture,
                        )
                        setProfileMap(
                            // @ts-ignore
                            prev => new Map([...prev, [user.profilePicture, profile]]),
                        )
                        resolve()
                    }
                })
            })
            await Promise.all(promises)
        }
        if (userTokenData?.token) {
            if (rankingsResponse) {
                fetchProfile(rankingsResponse.data.rankings)
            }

            if (starryPeopleResponse) {
                fetchProfile(Object.values(starryPeopleResponse))
            }
        }
    }, [userTokenData, rankingsResponse, starryPeopleResponse, timeType])

    //development 환경에서는 bi 통계 데이터 나오게 강제 출력 (Only *개발*)
    useEffect(() => {
        getUserAccessTokenData(true).then((data: any) => {
            setUserTokenData(data)
        })
    }, [])

    // 9분마다 액세스 토큰 갱신
    useInterval(() => {
        getUserAccessTokenData(true).then((data: any) => {
            setUserTokenData(data)
        })
    }, 9 * 60 * 1000)

    //development 환경에서는 bi 통계 데이터 나오게 강제 출력 (Only *개발*)
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            setUserTokenData({
                serverUrl: 'https://beyond-imagination.jetbrains.space',
                token: process.env.SPACE_ACCESS_TOKEN || '',
            })
        }
    }, [])

    //timeType이 변경될 경우, ReRendering
    useEffect(() => {}, [timeType])
    return (
        <>
            {showModal && <NoContentPopup organizationName={organization?.name} toggleModal={toggleModal}></NoContentPopup>}
            <MainTitle
                organization={organization}
                selectedTab={selectedTab}
                selectTab={selectTab}
                remainStarData={remainStarResponse?.data.remainStar}
            ></MainTitle>
            {selectedTab == 1 && (
                <Personal
                    userData={userData}
                    scoreData={userScoreData?.data}
                    codeLineData={userCodeLineData?.data}
                    scoreList={userScoreListResponse?.data}
                    profileMap={profileMap}
                    timeType={timeType}
                    setTimeType={setTimeType}
                ></Personal>
            )}
            {selectedTab == 2 && (
                <Organization
                    organizationName={organization?.name}
                    summaryResponse={summaryResponse?.data}
                    rankingsResponse={rankingsResponse?.data}
                    scoreListResponse={scoreListResponse?.data}
                    timeType={timeType}
                    setTimeType={setTimeType}
                ></Organization>
            )}
            {selectedTab == 3 && (
                <Dashboard
                    organization={organization}
                    rankingsResponse={rankingsResponse?.data}
                    codeLineRankingsResponse={codeLineRankingsResponse?.data}
                    summaryResponse={summaryResponse?.data}
                    profileMap={profileMap}
                    achieveTypes={achieveTypes}
                    codeLineTypes={codeLineTypes}
                    timeType={timeType}
                    setTimeType={setTimeType}
                    indicatorType={indicatorType}
                    setIndicatorType={setIndicatorType}
                ></Dashboard>
            )}
            {selectedTab == 4 && (
                <Star
                    organizationName={organization?.name}
                    profileMap={profileMap}
                    starryPeople={starryPeople}
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                ></Star>
            )}

            <div className={`flex justify-center text-[#D9D9D9]`}>
                <span>ⓒ 2022 Beyond_Imagination All Rights Reserved. </span>
            </div>
        </>
    )
}

export default Home
