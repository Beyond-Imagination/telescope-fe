import InfoIcon from '../../assets/info.svg'
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
  return (
    <div>
      <div className={`mb-3 flex justify-between`}>
        <div className={`flex items-center`}>
          <span className={`mr-[15px] hover:cursor-pointer`}>
            <InfoIcon></InfoIcon>
          </span>
          <span className="text-[19px] font-bold text-[#171A3D]">
            Team Productivity
          </span>
        </div>
        {/*<div className={`w-[286px] h-[31px] bg-[#F6F7FA] rounded`}>Hello</div>*/}
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
            number: merge_mr,
            text: 'Create Code Review',
            color: '#E9488B',
          })}
          {DivSummary({
            number: create_code_review,
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
