import Information from '../common/Information'
import { useTimeTypeStore } from '@/store/TimeTypeStore'

function DateSelector() {
    const timeType = useTimeTypeStore(state => state.timeType)
    const selectStyle = `bg-[#222222] text-[white]`
    const unSelectStyle = `bg-[#F4F4F4] text-[#999999]`
    const setTimeType = useTimeTypeStore(state => state.setTimeType)
    return (
        <div className={`flex items-center`}>
            <div className={`flex items-center justify-between text-[#23222C]`}>
                <div
                    className={`flex items-center hover:cursor-pointer p-2 mr-2 rounded-[8px] ${timeType === 'day' ? selectStyle : unSelectStyle}`}
                    onClick={() => {
                        setTimeType(`day`)
                    }}
                >
                    <span className={`text-[12px] font-bold `}>Today</span>
                </div>
                <div
                    className={`flex items-center hover:cursor-pointer p-2 mr-2 rounded-[8px] ${timeType === 'week' ? selectStyle : unSelectStyle}`}
                    onClick={() => {
                        setTimeType(`week`)
                    }}
                >
                    <span className={`text-[12px] font-bold `}>This Week</span>
                </div>
                <div
                    className={`flex items-center hover:cursor-pointer p-2 mr-2 rounded-[8px] ${timeType === 'month' ? selectStyle : unSelectStyle}`}
                    onClick={() => {
                        setTimeType(`month`)
                    }}
                >
                    <span className={`text-[12px] font-bold `}>This Month</span>
                </div>
                <div
                    className={`flex items-center hover:cursor-pointer p-2 mr-2 rounded-[8px] ${timeType === 'year' ? selectStyle : unSelectStyle}`}
                    onClick={() => {
                        setTimeType(`year`)
                    }}
                >
                    <span className={`text-[12px] font-bold `}>This Year</span>
                </div>
                <Information className={`mr-4`} informationText={'Time'}></Information>
            </div>
        </div>
    )
}

export default DateSelector
