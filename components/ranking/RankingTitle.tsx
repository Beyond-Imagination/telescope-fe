import { IType } from '../common/MainTitle'

interface IRankingTitle {
    types: IType[]
}

function RankingTitle({ types }: IRankingTitle) {
    return (
        <div className={`my-6 flex justify-between`}>
            <div className={`flex gap-[30px] items-center`}>
                {types.map((value, index) => (
                    <div key={index} className={`flex items-center gap-1`}>
                        <div
                            className={`w-2.5 h-2.5 rounded-xl`}
                            style={{
                                backgroundColor: value.active ? value.color : '#ABABAB',
                            }}
                        ></div>
                        <div>
                            <span className={`font-normal font-semibold text-[13px] color-[#23222c]`}>{value.display}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RankingTitle
