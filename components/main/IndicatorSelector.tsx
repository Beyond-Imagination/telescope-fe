interface IDateSelector {
    indicatorType: string
    setIndicatorType: any
}

function IndicatorSelector({ indicatorType, setIndicatorType }: IDateSelector) {
    const selectStyle = `bg-[#222222] text-[white]`
    const unSelectStyle = `bg-[#F4F4F4] text-[#999999]`
    return (
        <div className={`flex items-center`}>
            <div className={`flex items-center justify-between text-[#23222C]`}>
                <div
                    className={`flex items-center hover:cursor-pointer p-2 mr-2 rounded-[8px] ${
                        indicatorType === 'Achievement' ? selectStyle : unSelectStyle
                    }`}
                    onClick={() => {
                        setIndicatorType(`Achievement`)
                    }}
                >
                    <span className={`text-[12px] font-bold `}>Achievement</span>
                </div>
                <div
                    className={`flex items-center hover:cursor-pointer p-2 mr-2 rounded-[8px] ${
                        indicatorType === 'CodeLine' ? selectStyle : unSelectStyle
                    }`}
                    onClick={() => {
                        setIndicatorType(`CodeLine`)
                    }}
                >
                    <span className={`text-[12px] font-bold `}>Code Line</span>
                </div>
            </div>
        </div>
    )
}

export default IndicatorSelector
