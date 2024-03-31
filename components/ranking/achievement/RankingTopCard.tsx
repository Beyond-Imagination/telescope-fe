import StackBarchart from './StackBarchart'
import ProfilePicture from '@/components/atom/ProfilePicture'
import React from 'react'

const RankingTopCard = ({ style, ranking, index }: any) => {
    return (
        <div
            className={`w-[280px] rounded-[24px] text-[${style.textColor}] py-2.5`}
            style={{
                background: `${style.bgColor}`,
                border: `rgba(0,0,0,0.05)`,
            }}
        >
            <div className={`flex justify-between px-4`}>
                <div className={`text-[56px]`}>0{index}</div>
                <div className={`flex items-start`}>
                    <div className={`mr-2`}>overall</div>
                    <div className={`text-[32px] flex`} style={{ lineHeight: '100%' }}>
                        {ranking?.score.total ? ranking?.score.total : 0}
                    </div>
                </div>
            </div>
            <div className={`flex px-4 py-2 items-center`}>
                <div className={`mr-2`}>
                    <ProfilePicture
                        className="rounded-[20px] w-12 h-12"
                        profilePicture={ranking?.profilePicture}
                        name={ranking?.name}
                        jdenticonSize={50}
                    />
                </div>
                <div className={`test-[16px] font-bold`}>{ranking?.name ? ranking?.name : 'None'}</div>
            </div>
            <div
                className={`flex `}
                style={
                    ranking
                        ? {}
                        : {
                              background: 'rgba(255,255,255,50%)',
                              height: 24,
                              marginBottom: 16,
                              width: '100%',
                          }
                }
            >
                {ranking && (
                    <StackBarchart
                        options={{
                            height: 40,
                            annotations: {
                                textStyle: {
                                    fontSize: 14,
                                    color: '#FFF', // Label text color
                                    bold: 'true', // Label text boldness
                                },
                            },
                            isStacked: 'percent',
                        }}
                        annotation={true}
                        ranking={ranking}
                    ></StackBarchart>
                )}
            </div>
        </div>
    )
}

export default RankingTopCard
