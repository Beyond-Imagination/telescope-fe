import Jdenticon from 'react-jdenticon'
import React, { useEffect } from 'react'
import Information from '../common/Information'
import DateSelector from '../main/DateSelector'
import { ScoreBoard, TotalScoreBoard } from '../common/ScoreBoard'

function Personal({ organizationName, userData, scoreData, profileMap, timeType, setTimeType }: any) {
    useEffect(() => {}, [timeType])
    const colors: any = {
        createIssue: '#F2994A',
        resolveIssue: '#2F80ED',
        createCodeReview: '#27AE60',
        mergeMr: '#9B51E0',
        receiveStar: '#F2C94C',
    }

    return (
        <div className={`flex pt-6 px-6 flex-col`}>
            <div className={`w-full`}>
                <div>
                    <span className={`text-[14px] text-[#999999]`}>My Score</span>
                </div>
                <div className={`flex justify-between`}>
                    <div className={`flex`}>
                        <span>
                            {userData?.profilePicture ? (
                                <div>
                                    <img
                                        className={`rounded-[20px]`}
                                        src={profileMap.get(userData.profilePicture)}
                                        style={{ height: 40, width: 40 }}
                                        alt="picture"
                                    />
                                </div>
                            ) : (
                                <Jdenticon size="40" value={userData?.name ? `${userData.name.firstName} ${userData.name.lastName}` : 'Nickname'} />
                            )}
                        </span>
                        <span className={`font-normal text-[32px] color-[#23222c] mx-2`} style={{ fontWeight: 600 }}>
                            {userData?.name ? `${userData.name.firstName} ${userData.name.lastName}` : 'Nickname'}
                        </span>
                    </div>
                    <DateSelector setTimeType={setTimeType} timeType={timeType}></DateSelector>
                </div>
                <div className={`flex-1 scoreFrame`} style={{ justifyContent: 'space-between' }}>
                    <div>
                        <div className={`grid grid-cols-4 gap-2`}>
                            <TotalScoreBoard score={scoreData ? scoreData.score.total : 0} />
                            <ScoreBoard color={colors.createIssue} score={scoreData ? scoreData.score.createIssue : 0} title={'Create<br/>Issues'} />
                            <ScoreBoard
                                color={colors.resolveIssue}
                                score={scoreData ? scoreData.score.resolveIssue : 0}
                                title={'Resolve<br/>issues'}
                            />
                            <ScoreBoard
                                color={colors.createCodeReview}
                                score={scoreData ? scoreData.score.createCodeReview : 0}
                                title={'Create<br/>Code Review'}
                            />
                            <ScoreBoard color={colors.mergeMr} score={scoreData ? scoreData.score.mergeMr : 0} title={'Merge<br/>MR'} />
                            <ScoreBoard color={colors.receiveStar} score={scoreData ? scoreData.score.receiveStar : 0} title={'Receive<br/>Star'} />
                        </div>
                    </div>
                </div>
            </div>

            {/* star information panel */}
            <div className={`w-full my-5`}>
                <div>
                    <span className={`font-normal text-[32px] color-[#23222c] mx-2`}>⭐ Star</span>
                </div>

                <div className={`bg-[#E4BD31]/20 rounded-md w-full p-4`}>
                    <div className={`mb-2`}>
                        <div className={`text-[32px] color-[#23222c]`}>What ⭐️ means?</div>
                        <div className={`text-[18px] text-black/60`}>celebration for your teammates by what they have done</div>
                    </div>
                    <div className={`mb-2`}>
                        <div className={`text-[32px] color-[#23222c]`}>How to use ⭐️?</div>
                        <div className={`text-[18px] text-black/60`}>Use ⭐️ (:star:) reaction on Space’s chat </div>
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

export default Personal
