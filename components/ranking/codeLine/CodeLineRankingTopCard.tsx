import ProfilePicture from '@/components/atom/ProfilePicture'

const CodeLineRankingTopCard = ({ style, ranking, index, imageSrc }: any) => {
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
                        {ranking?.codeLines.total ? ranking?.codeLines.total : 0}
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
        </div>
    )
}

export default CodeLineRankingTopCard
