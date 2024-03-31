import { useState } from 'react'
import Link from 'next/link'

import { useOrganization } from '@/hooks'
import NoContentPopup from '../../../components/common/NoContentPopup'
import RemainStar from '@/components/header/RemainStar'

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

    const organization = useOrganization()

    return (
        <>
            {showModal && <NoContentPopup organizationName={organization?.name} toggleModal={toggleModal}></NoContentPopup>}
            <div className={`px-6 py-[16px]`} style={{ flex: 1, justifyContent: 'space-between', display: 'flex' }}>
                <div className={`flex items-center `}>
                    <span className={`font-normal text-[21px] mr-3.5`} style={{ fontWeight: 600, color: 'grey' }}>
                        Telescope
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RemainStar />
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
