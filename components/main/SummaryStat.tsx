function DivSummary({ number, text, color }: any) {
  return (
    <div className="flex flex-col	items-center items-center gap-1">
      <span className="font-bold text-[45px]"
      style={{color : color}}>
        {number}
      </span>
      <span className="font-bold text-[9px] text-[#9A9EA6]">
        {text}
      </span>
    </div>
  )
}

function SummaryStat({ total, create_issue, resolve_issue, create_code_review, merge_mr }: any) {
  return (
    <div>
      <span className="w-[163px] h-[23px]">
        Team Productivity
      </span>
      
      <div
        className={`w-full h-[111px] flex justify-center shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)] rounded mb-[12px]`}
      >
        <div className="w-[733px] flex justify-center items-center flex-row items-start gap-[94px]">
          {DivSummary({ number: total, text: 'total', color:'#8000FF' })}
          {DivSummary({ number: create_issue, text: 'create_issue', color:'#00FF38' })}
          {DivSummary({ number: resolve_issue, text: 'resolve_issue', color:'#3FF7C0' })}
          {DivSummary({ number: create_code_review, text: 'create_code_review', color:'#E9488B' })}
          {DivSummary({ number: merge_mr, text: 'merge_mr', color:'#387AF1' })}
        </div>
      </div>
    </div>
  )
}

export default SummaryStat