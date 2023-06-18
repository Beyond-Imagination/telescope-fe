import Information from '../common/Information'
import { Chart } from 'react-google-charts'
import { PieChart } from '../common/PieChart'
import { ScoreBoard, TotalScoreBoard } from '../common/ScoreBoard'

export default function Organization({
  organizationName,
  summaryResponse,
  userScoreResponse,
  scoreListResponse,
  timeType,
  setTimeType,
}: any) {
  const colors: any = {
    createIssue: '#F2994A',
    resolveIssue: '#2F80ED',
    createCodeReview: '#27AE60',
    mergeMr: '#9B51E0',
    receiveStar: '#F2C94C',
  }

  const keys = Object.keys(colors)
  let data = [keys.slice()]
  const barCharColors = keys.map((key) => colors[key])
  data[0].splice(0, 0, 'Date')

  for (let date in scoreListResponse) {
    let score: any[] = [date]
    for (let i in keys) {
      score.push(scoreListResponse[date][keys[i]])
    }
    data.push(score)
  }

  const options = {
    legend: 'none',
    bar: { groupWidth: '40%' },
    isStacked: true,
    chartArea: {
      left: 40,
      bottom: 20,
      top: 10,
      right: 0,
    },
    vAxis: {
      minorGridlines: {
        color: 'transparent',
      },
      format: '0',
    },
    colors: barCharColors,
  }

  return (
    <div className={`py-[26px] px-[55px] flex flex-col`}>
      <div className={`mb-5 flex justify-between`}>
        <div>
          <span className={`text-[14px] `} style={{ color: '#999999' }}>
            Team Score
          </span>
          <br />
          <span
            className={`font-normal text-[32px]`}
            style={{ fontWeight: 700, color: '#23222C', lineHeight: 1 }}
          >
            {organizationName}
          </span>
        </div>

        <div className={`flex items-center`} style={{ float: 'right' }}>
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
            <Information
              className={`mr-4`}
              informationText={'Time'}
            ></Information>
          </div>
        </div>
      </div>
      <div
        className={`flex-1 scoreFrame`}
        style={{ justifyContent: 'space-between' }}
      >
        <div>
          <div className={`grid grid-cols-4 gap-2`}>
            <TotalScoreBoard
              score={summaryResponse ? summaryResponse.score.total : 0}
            />
            <ScoreBoard
              color={colors.createIssue}
              score={summaryResponse ? summaryResponse.score.createIssue : 0}
              title={'Create<br/>Issues'}
            />
            <ScoreBoard
              color={colors.resolveIssue}
              score={summaryResponse ? summaryResponse.score.resolveIssue : 0}
              title={'Resolve<br/>issues'}
            />
            <ScoreBoard
              color={colors.createCodeReview}
              score={
                summaryResponse ? summaryResponse.score.createCodeReview : 0
              }
              title={'Create<br/>Code'}
            />
            <ScoreBoard
              color={colors.mergeMr}
              score={summaryResponse ? summaryResponse.score.mergeMr : 0}
              title={'Merge<br/>MR'}
            />
            <ScoreBoard
              color={colors.receiveStar}
              score={summaryResponse ? summaryResponse.score.receiveStar : 0}
              title={'Receive<br/>Star'}
            />
          </div>
        </div>
      </div>
      <div
        className={'justify-between h-[300px] w-[580px]'}
        style={{
          marginTop: '24px',
          display: 'flex',
          fontSize: '14px',
          color: '#999999',
          fontWeight: 500,
        }}
      >
        <PieChart score={summaryResponse?.score} title="Team Score"></PieChart>

        <PieChart
          score={userScoreResponse?.score}
          title="User Score"
        ></PieChart>
      </div>

      <div style={{ width: '100%' }}>
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="200px"
          data={data}
          options={options}
        />
      </div>
    </div>
  )
}
