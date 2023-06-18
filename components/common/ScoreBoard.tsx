export function ScoreBoard({ className, color, score, title }: any) {
    return (
        <div
            className={`h-[110px] flex justify-left items-center rounded-[24px] ${className} `}
            style={{
                background: `linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), ${color}`,
            }}
        >
            <div className={`flex flex-col`} style={{ paddingLeft: 24 }}>
                <div>
                    <p
                        className={`text-[12px]`}
                        style={{
                            fontWeight: 500,
                            color: 'white',
                            fontFamily: 'Pretendard',
                            lineHeight: '14px',
                        }}
                        dangerouslySetInnerHTML={{ __html: title }}
                    ></p>
                </div>
                <div style={{ lineHeight: 1 }}>
                    <span
                        className={`text-[36px]`}
                        style={{
                            fontWeight: 300,
                            color: 'white',
                            fontFamily: 'Pretendard',
                        }}
                    >
                        {score}
                    </span>
                </div>
            </div>
        </div>
    )
}

export function TotalScoreBoard({ className, score }: any) {
    return (
        <div
            className={`row-span-2 h-[230px] flex justify-left items-center rounded-[24px] ${className} `}
            style={{
                background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%), #F4F4F4',
            }}
        >
            <div className={`flex flex-col`} style={{ paddingLeft: 24 }}>
                <div>
                    <span
                        className={`text-[12px]`}
                        style={{
                            fontWeight: 500,
                            color: '#999999',
                            fontFamily: 'Pretendard',
                        }}
                    >
                        Total Score
                    </span>
                </div>
                <div style={{ lineHeight: 1, fontFamily: 'Pretendard' }}>
                    <span className={`font-normal text-[40px]`} style={{ fontWeight: 300, color: '#333333' }}>
                        {score}
                    </span>
                </div>
            </div>
        </div>
    )
}
