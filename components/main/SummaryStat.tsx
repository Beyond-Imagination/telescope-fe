import InfoIcon from '../../assets/info.svg'
import { useState } from 'react'
function DivSummary({ number, text, color }: any) {
  return (
    <div className="flex flex-col w-[120px] items-center gap-1">
      <span className="font-bold text-[45px]" style={{ color: color }}>
        {number}
      </span>
      <span className="font-bold text-[12px] text-[#9A9EA6]">{text}</span>
    </div>
  )
}

function SummaryStat({
  total,
  create_issue,
  resolve_issue,
  create_code_review,
  merge_mr,
}: any) {
  const [timeType, setTimeType] = useState('day')
  return (
    <div>
      <div className={`mb-3 flex justify-between`}>
        <div
          className={`flex items-center hover:cursor-pointer px-3 py-0.5`}
          onClick={() => {
            setTimeType(`7days`)
          }}
        >
          <span className={`mr-[15px] hover:cursor-pointer px-3 py-0.5`}>
            <InfoIcon></InfoIcon>
          </span>
          <span className="text-[19px] font-bold text-[#171A3D]">
            Team Productivity
          </span>
        </div>
        <div className={`flex items-center`}>
          <div className={`mr-5`}>
            <span className={`text-[12px] text-[#727272] font-bold`}>
              Timeframe
            </span>
          </div>
          <div
            className={`w-[286px]  bg-[#F6F7FA] rounded flex items-center justify-between px-4 py-1`}
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
              <span className={`text-[12px] font-bold `}>Last</span>
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
              <span className={`text-[12px] font-bold `}>7days</span>
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
              <span className={`text-[12px] font-bold `}>30days</span>
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
              <span className={`text-[12px] font-bold `}>This year</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full h-[111px] flex justify-center shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)] rounded mb-[12px]`}
      >
        <div className="w-full flex justify-center items-center flex-row justify-around">
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
          {DivSummary({ number: total, text: 'Total Score', color: '#387AF1' })}
        </div>
      </div>
    </div>
  )
}

export default SummaryStat
