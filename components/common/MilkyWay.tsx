import React from 'react'

export function MilkyWay({ scoreList }: any) {
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
                result[index].push(
                    <td>
                        <div
                            style={{
                                width: '22px',
                                height: '22px',
                                margin: '4px',
                                textAlign: 'center',
                                borderRadius: '5px',
                                border: `1px solid lightgray`,
                            }}
                        >
                            <img src={getImage(month[day])} />
                        </div>
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
                <table>{rendering()}</table>
            </div>
        </>
    )
}

function getImage(score: number): string {
    if (score == 0) return ''
    else if (score > 9) return '../../assets/star4.png'
    return '../../assets/star' + Math.ceil(score / 3) + '.png'
}
