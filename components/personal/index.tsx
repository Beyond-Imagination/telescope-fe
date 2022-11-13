import styled from 'styled-components'
import Jdenticon from 'react-jdenticon'
import Information from '../common/Information'
import { BoardTitle } from '../main/SummaryStat'

const MemberName = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 29px;
  line-height: 32px;
  color: #23222c;
`
const ScoreTitle = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  color: #23222c;
`
const ScoreBoardScore = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 70px;
  line-height: 84px;
  color: #ffffff;
`

const ScoreBoardTitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;

  color: #ffffff;
`
const ScoreBoard = ({ className, color, score, title }: any) => {
  return (
    <div
      className={`w-[240px] h-[185px] flex justify-center items-center rounded-[16px] ${className} `}
      style={{ backgroundColor: color }}
    >
      <div className={`flex flex-col items-center`}>
        <div className={`mb-[18px]`}>
          <ScoreBoardScore>{score}</ScoreBoardScore>
        </div>
        <div>
          <ScoreBoardTitle>{title}</ScoreBoardTitle>
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
          <ScoreBoardTitle>{`Total`}</ScoreBoardTitle>
          <br />
          <ScoreBoardTitle>{`Score`}</ScoreBoardTitle>
        </div>
        <div className={``}>
          <ScoreBoardScore>{score}</ScoreBoardScore>
        </div>
      </div>
    </div>
  )
}
function Personal({ timeType, setTimeType }: any) {
  return (
    <div className={`py-9`}>
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
      <div className={`flex px-[68px] `}>
        <div className={`w-[290px] h-[290px] rounded-[18px] mr-11`}>
          <Jdenticon size="290" value={`Sun-Young HA`} />
        </div>
        <div>
          <div>
            <MemberName>Sun-Young HA</MemberName>
          </div>
          <div>
            <div>
              <ScoreTitle>Personal score</ScoreTitle>
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
