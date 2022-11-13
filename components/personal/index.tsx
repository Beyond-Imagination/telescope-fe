import Jdenticon from 'react-jdenticon'

const ScoreBoard = ({ className, color, score, title }: any) => {
  return (
    <div
      className={`w-[240px] h-[185px] flex justify-center items-center rounded-[16px] ${className} `}
      style={{ backgroundColor: color }}
    >
      <div className={`flex flex-col items-center`}>
        <div className={`mb-[18px]`}>
          <span
            className={`font-normal text-[70px]`}
            style={{ fontWeight: 700, color: 'white' }}
          >
            {score}
          </span>
        </div>
        <div>
          <span
            className={`font-normal text-[18px]`}
            style={{ fontWeight: 600, color: 'white' }}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  )
}
const TotalScoreBoard = ({ className, color, score }: any) => {
  return (
    <div
      className={`w-[491px] h-[110px] flex items-center rounded-[16px] px-11 ${className} `}
      style={{ backgroundColor: color }}
    >
      <div className={`flex items-center justify-between flex-1`}>
        <div className={``}>
          <span
            className={`font-normal text-[18px]`}
            style={{ fontWeight: 600, color: 'white' }}
          >{`Total`}</span>
          <br />
          <span
            className={`font-normal text-[18px]`}
            style={{ fontWeight: 600, color: 'white' }}
          >{`Score`}</span>
        </div>
        <div className={``}>
          <span
            className={`font-normal text-[70px]`}
            style={{ fontWeight: 700, color: 'white' }}
          >
            {score}
          </span>
        </div>
      </div>
    </div>
  )
}
function Personal({ timeType, setTimeType }: any) {
  return (
    <div className={`py-[26px] px-[55px] flex flex-col`}>
      <div className={`mb-5 flex justify-end`}>
        <div className={`flex items-center`}>
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
      <div className={`flex flex-1`}>
        <div className={`w-[290px] h-[290px] rounded-[18px] mr-11 flex-1`}>
          <Jdenticon size="290" value={`Sun-Young HA`} />
        </div>
        <div>
          <div>
            <span
              className={`font-normal text-[29px] color-[#23222c]`}
              style={{ fontWeight: 700 }}
            >
              Sun-Young HA
            </span>
          </div>
          <div>
            <div>
              <span
                className={`font-normal text-[17px] color-[#23222c]`}
                style={{ fontWeight: 700 }}
              >
                Personal score
              </span>
            </div>
            <div className={`grid grid-cols-4 gap-3`}>
              <ScoreBoard
                className={`col-span-2`}
                color={'#B250FF'}
                score={6}
                title={'Create Issues'}
              />
              <ScoreBoard
                className={`col-span-2`}
                color={'#00FF38'}
                score={6}
                title={'Resolve issues'}
              />
              <ScoreBoard
                className={`col-span-2`}
                color={'#E9488B'}
                score={6}
                title={'Create Code review'}
              />
              <ScoreBoard
                className={`col-span-2`}
                color={'#21D9CE'}
                score={6}
                title={'Merge MR'}
              />
              <TotalScoreBoard
                className={`col-span-4`}
                color={'#377FFF'}
                score={6}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Personal
