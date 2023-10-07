import React from 'react'
import StarryPerson from './StarryPerson'

export interface StarryPerson {
    year: number
    month: number
    id: string
    name: string
    score: number
    profilePicture: string | null
}

function Star({ organizationName, profileMap, starryPeople, month, setMonth, year, setYear }: any) {
    function left() {
        if (month == 1) {
            setMonth(12)
            setYear(year - 1)
            return
        }
        setMonth(month - 1)
    }

    function right() {
        const now = new Date()
        if (now.getFullYear() == year && now.getMonth() <= month) return
        if (month == 12) {
            setMonth(1)
            setYear(year + 1)
            return
        }
        setMonth(month + 1)
    }

    function getStarryMapKey(month: number) {
        if (month < 1) return `${year - 1}_${month + 12}`
        return `${year}_${month}`
    }

    return (
        <div className={`flex pt-6 px-6 flex-col`}>
            <div className={`w-full`}>
                <div className={`flex justify-between mb-4`}>
                    <div>
                        <span className={`font-bold text-[32px] text-[#999999]`}>{organizationName || 'Telescope'}</span>
                    </div>
                </div>

                <div>
                    <p className={`text-4xl m-1 mb-2 font-bold`}>Starry People of the Month</p>
                </div>
                <div className={'flex'} style={{ justifyContent: 'center' }}>
                    <button className={'font-bold text-[90px]'} style={{ alignSelf: 'center', color: '#d9d9d9', marginRight: '10px' }} onClick={left}>
                        ◂
                    </button>
                    <StarryPerson
                        info={starryPeople[getStarryMapKey(month - 2)]}
                        month={month - 2}
                        imageSrc={profileMap.get(starryPeople[getStarryMapKey(month - 2)]?.profilePicture)}
                    ></StarryPerson>
                    <StarryPerson
                        info={starryPeople[getStarryMapKey(month - 1)]}
                        month={month - 1}
                        imageSrc={profileMap.get(starryPeople[getStarryMapKey(month - 1)]?.profilePicture)}
                    ></StarryPerson>
                    <StarryPerson
                        info={starryPeople[getStarryMapKey(month)]}
                        month={month}
                        imageSrc={profileMap.get(starryPeople[getStarryMapKey(month)]?.profilePicture)}
                    ></StarryPerson>
                    <button className={'font-bold text-[90px]'} style={{ alignSelf: 'center', color: '#d9d9d9', marginLeft: '10px' }} onClick={right}>
                        ▸
                    </button>
                </div>
            </div>
            {/* star information panel */}
            <div className={`w-full my-5`}>
                <div>
                    <span className={`text-4xl m-1 mb-2 font-bold`}>⭐ Star</span>
                </div>

                <div className={`bg-[#E4BD31]/20 rounded-md w-full p-4`}>
                    <div className={`mb-2`}>
                        <div className={`text-[32px] color-[#23222c]`}>What ⭐️ means?</div>
                        <div className={`text-[18px] text-black/60`}>celebration for your teammates by what they have done</div>
                    </div>
                    <div className={`mb-2`}>
                        <div className={`text-[32px] color-[#23222c]`}>How to use ⭐️?</div>
                        <div className={`text-[18px] text-black/60`}>Use ⭐️ (:star:) reaction on Space’s chat</div>
                    </div>
                    <div className={`mb-2`}>
                        <div className={`text-[32px] color-[#23222c]`}>How many ⭐️ can I send?</div>
                        <div className={`text-[18px] text-black/60`}>You can send 5 stars on a day</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Star
