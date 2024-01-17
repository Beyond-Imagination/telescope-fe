import React, { useState } from 'react'

export function MilkyWay({ scoreList }: any) {
    const [tooltipVisible, setTooltipVisible] = useState<{ [key: string]: boolean }>({})

    const handleMouseEnter = (key: string) => {
        setTooltipVisible(prev => ({ ...prev, [key]: true }))
    }

    const handleMouseLeave = (key: string) => {
        setTooltipVisible(prev => ({ ...prev, [key]: false }))
    }

    const getTotalColumns = (scoreList: { [x: string]: string | any[] }) => {
        let totalDays = 0
        for (let monthName in scoreList) {
            totalDays += scoreList[monthName].length
        }
        return Math.ceil(totalDays / 7)
    }

    const totalColumns = getTotalColumns(scoreList)

    const weekName = [' ', 'Mon', ' ', 'Wed', ' ', 'Fri', ' ']
    const rendering = () => {
        if (!scoreList || scoreList.length == 0) return []
        const result = []
        const header = [<th key={0}></th>]
        for (let i = 0; i < 7; i++) {
            let list = [
                <th style={{ paddingRight: '10px' }} key={i}>
                    {weekName[i]}
                </th>,
            ]
            result.push(list)
        }
        let index = 0
        let previewCol = 0
        let col = 0
        for (let monthName in scoreList) {
            let month = scoreList[monthName]
            for (let day = 0; day < month.length; day++) {
                const key = `${monthName}-${day}`
                const isRightEdge = col >= totalColumns - 2
                const isSecondLastCol = col === totalColumns - 2
                const isLastCol = col === totalColumns - 1

                result[index].push(
                    <td
                        key={key}
                        onMouseEnter={() => handleMouseEnter(key)}
                        onMouseLeave={() => handleMouseLeave(key)}
                        style={{ position: 'relative' }}
                    >
                        <div
                            style={{
                                maxWidth: '35px',
                                width: '90%',
                                aspectRatio: '1/1',
                                margin: '4px',
                                textAlign: 'center',
                                borderRadius: '5px',
                                border: `1px solid lightgray`,
                            }}
                        >
                            <img src={getImage(month[day])} />
                        </div>
                        {tooltipVisible[key] && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: isRightEdge ? 'auto' : '50%',
                                    right: isLastCol ? '20%' : isSecondLastCol ? '30%' : 'auto',
                                    transform: isLastCol ? 'translateX(20%)' : isSecondLastCol ? 'translateX(30%)' : 'translateX(-50%)',
                                    backgroundColor: 'rgba(119, 136, 153, 1)',
                                    color: '#fff',
                                    padding: '5px',
                                    borderRadius: '5px',
                                    zIndex: 1,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {`${month[day]} contributions on  ${monthName},  ${day + 1}`}
                            </div>
                        )}
                    </td>,
                )
                if (++index == 7) {
                    index = 0
                    col++
                }
            }
            const diff = col - previewCol
            if (diff > 1) {
                // 1개의 달이 2개 이상의 열을 차지할 경우에만 월 이름을 표시
                header.push(
                    <th style={{ textAlign: 'left', paddingLeft: '5px' }} colSpan={diff}>
                        {monthName}
                    </th>,
                )
            } else {
                for (let i = 0; i < diff; i++) header.push(<th></th>)
            }
            previewCol = col
        }
        const table = []
        table.push(<tr>{header}</tr>)
        for (let i = 0; i < 7; i++) {
            table.push(<tr key={i}>{result[i]}</tr>)
        }
        return table
    }
    return (
        <>
            <div>
                <span className={`text-4xl m-1 mb-2 font-bold`}>🌌 Milky way</span>
            </div>
            <span className={`font-light text-[20px] color-[#23222c] mx-2`}>make your own milky way</span>
            <div style={{ background: 'black', color: 'white', padding: '15px' }} className={'rounded-md'}>
                <table style={{ width: '100%' }}>{rendering()}</table>
            </div>
        </>
    )
}

function getImage(score: number): string {
    if (score == 0) return 'blank.png' // 이미지를 아무것도 넣지 않으면 image 태그가 크기를 가지지 않아 UI가 깨지기 때문에 비어있는 이미지 사용
    else if (score > 9) return './star4.png'
    return './star' + Math.ceil(score / 3) + '.png'
}
