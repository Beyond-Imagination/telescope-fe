import Information from '../common/Information'

function DivSummary({ number, text, color }: any) {
  return (
    <div className="flex flex-col w-[120px] items-center gap-1">
      <span className="font-bold text-[36px] text-[#FFF]">
        {number ? number : 0}
      </span>
      <span
        className="font-bold text-[12px] text-[#9A9EA6]"
        style={{ color: color }}
      >
        {text}
      </span>
    </div>
  )
}

function SummaryStat({
  total,
  create_issue,
  resolve_issue,
  create_code_review,
  merge_mr,
  timeType,
  setTimeType,
}: any) {
  return (
    <div className={`summaryStat`}>
      <div className={`mb-3 flex justify-between`}>
        <div className={`flex items-center pl-3`}>
          <span
            className={`font-normal text-[17px] mr-3.5`}
            style={{ fontWeight: 700, color: '#23222C' }}
          >
            Score
          </span>
          <Information className={`mr-4`}></Information>
        </div>
        <div className={`flex items-center timeFrame`}>
          <div className={`mr-5`}>
            <span className={`text-[12px] text-[#23222C] font-bold`}>
              Timeframe
            </span>
          </div>
          <div
            className={`w-[286px]  bg-[#F6F7FA] rounded flex items-center justify-between px-4 py-1 text-[#23222C]`}
          >
            <div
              className={`flex items-center hover:cursor-pointer px-3 py-0.5 ${
                timeType === 'day'
                  ? 'bg-white rounded shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)]'
                  : ''
              }`}
              onClick={() => {
                setTimeType(`day`)
              }}
            >
              <span className={`text-[12px] font-bold `}>TODAY</span>
            </div>
            <div
              className={`flex items-center hover:cursor-pointer px-3 py-0.5 ${
                timeType === 'week'
                  ? 'bg-white rounded shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)]'
                  : ''
              }`}
              onClick={() => {
                setTimeType(`week`)
              }}
            >
              <span className={`text-[12px] font-bold `}>WEEK</span>
            </div>
            <div
              className={`flex items-center hover:cursor-pointer px-3 py-0.5 ${
                timeType === 'month'
                  ? 'bg-white rounded shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)]'
                  : ''
              }`}
              onClick={() => {
                setTimeType(`month`)
              }}
            >
              <span className={`text-[12px] font-bold `}>MONTH</span>
            </div>
            <div
              className={`flex items-center hover:cursor-pointer px-3 py-0.5 ${
                timeType === 'year'
                  ? 'bg-white rounded shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)]'
                  : ''
              }`}
              onClick={() => {
                setTimeType(`year`)
              }}
            >
              <span className={`text-[12px] font-bold `}>YEAR</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full h-[96px] flex justify-center shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)] rounded mb-[12px] bg-[#23222C]`}
      >
        <div className="w-full flex justify-center items-center flex-row justify-around">
          {DivSummary({ number: total, text: 'Total Score', color: '#387AF1' })}

          {DivSummary({
            number: create_issue,
            text: 'Create Issues',
            color: '#8000FF',
          })}
          {DivSummary({
            number: resolve_issue,
            text: 'Resolve Issues',
            color: '#00FF38',
          })}
          {DivSummary({
            number: create_code_review,
            text: 'Create Code Review',
            color: '#E9488B',
          })}
          {DivSummary({
            number: merge_mr,
            text: 'Merge MR',
            color: '#3FF7C0',
          })}
        </div>
      </div>
    </div>
  )
}

export default SummaryStat
