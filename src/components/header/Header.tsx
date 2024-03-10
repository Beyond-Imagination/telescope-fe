import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import NoContentPopup from '../../../components/common/NoContentPopup'
import { useQuery } from '@tanstack/react-query'
import { IUserToken } from '../../../types/auth'
import * as spaceAPI from '../../../utils/api/spaceApi'
import { getUserAccessTokenData } from '../../../utils/api/spaceApi'
import { useInterval } from 'usehooks-ts'

const tabData = [
    { id: 1, title: 'My Score', link: '/' },
    { id: 2, title: 'Organization', link: '/organization' },
    { id: 3, title: 'Leaderboard', link: '/leaderboard' },
    { id: 4, title: 'Star', link: '/star' },
]

function Header() {
    const [selectedTab, setSelectedTab] = useState<number>(1)
    // 모달 버튼 클릭 유무를 저장할 state
    const [showModal, setShowModal] = useState(false)
    // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
    const toggleModal = () => {
        setShowModal(!showModal)
    }
    const [userTokenData, setUserTokenData] = useState<IUserToken>()
    const { data: organization } = useQuery([userTokenData?.serverUrl, 'organization'], () => fetchOrganizationHook(), {
        enabled: !!userTokenData?.token,
    })

    const fetchOrganizationHook = useCallback(() => {
        if (userTokenData?.token) return spaceAPI.getOrganization(userTokenData.serverUrl, userTokenData.token)
    }, [userTokenData])

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

    return (
        <>
            {showModal && <NoContentPopup organizationName={organization?.name} toggleModal={toggleModal}></NoContentPopup>}
            <div className={`px-6 py-[16px]`} style={{ flex: 1, justifyContent: 'space-between', display: 'flex' }}>
                <div className={`flex items-center `}>
                    <span className={`font-normal text-[21px] mr-3.5`} style={{ fontWeight: 600, color: 'grey' }}>
                        Telescope
                    </span>
                </div>
                {/*TODO: remain star 컴포넌트 분리*/}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            borderRadius: '8px',
                            border: `1px solid rgba(0, 0, 0, 0.05)`,
                            backgroundColor: '#E4BD31',
                            opacity: 1,
                            height: 'fit-content',
                            marginRight: '16px',
                        }}
                    >
                        <span
                            className={`text-[15px] font-normal`}
                            style={{
                                fontWeight: 600,
                                color: 'black',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '8px',
                                padding: '4px',
                            }}
                        >
                            <span className="ml-1 mr-1">You have</span>
                            <span role="img" aria-label="star">
                                ⭐
                            </span>
                            {/*
                        TODO: 실제 api 호출하여 reamin star 값 표시
                        <span className='ml-1 mr-1'>{remainStarData ? remainStarData : 0}</span>
                        */}
                            <span className="ml-1 mr-1">5</span>
                        </span>
                    </div>
                    <div className={`right-10 flex bottom-0 `}>
                        {tabData.map(tab => {
                            return (
                                <Link
                                    href={tab.link}
                                    key={tab.id}
                                    className={`w-[124px] py-[16px] flex justify-center hover:cursor-pointer`}
                                    style={{
                                        color: tab.id === selectedTab ? 'black' : 'lightgray',
                                        borderBottom: tab.id === selectedTab ? '3px solid' : '',
                                        backgroundColor: 'white',
                                        borderRadius: '4px 4px 0 0',
                                    }}
                                    onClick={() => setSelectedTab(tab.id)}
                                >
                                    <span
                                        className={`font-normal text-[15px]`}
                                        style={{
                                            fontWeight: 600,
                                            letterSpacing: `-0.03rem`,
                                        }}
                                    >
                                        {tab.title}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
