import Jdenticon from 'react-jdenticon'
import { useCallback, useEffect } from 'react'
import * as spaceAPI from '../../utils/api/space'
import { useQuery } from '@tanstack/react-query'
import axios from '../../utils/api'
import { IUserScore } from '../../pages/api/rankings'
import { convertDateByType, dateToString } from '../../utils/date'
import Information from '../common/Information'

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
function Personal({ userTokenData, timeType, setTimeType }: any) {
  const { data } = useQuery(['profile', 'me'], () => fetchProfileMe(), {
    enabled: !!userTokenData?.serverUrl,
  })

  const { data: data2 } = useQuery(
    ['score', timeType],
    () => fetchScoreByUserId(),
    {
      enabled: !!data?.id,
    }
  )
  const fetchProfileMe = useCallback(() => {
    if (userTokenData?.token)
      return spaceAPI.getMe(userTokenData.serverUrl, userTokenData.token)
  }, [userTokenData])
  let fromDate = new Date()
  let tomorrow = new Date()
  tomorrow.setDate(fromDate.getDate() + 1)
  const fetchScoreByUserId = useCallback(() => {
    if (userTokenData?.token && data)
      return axios.get<IUserScore>(
        `api/users/${data.id}/score?serverUrl=${encodeURIComponent(
          userTokenData.serverUrl
        )}&from=${dateToString(
          convertDateByType(timeType, fromDate)
        )}&to=${dateToString(tomorrow)}`
      )
  }, [userTokenData, data, timeType])

  useEffect(() => {}, [timeType])

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
            <Information
            className={`mr-4`}
            informationText={'Time'}
            ></Information>
          </div>
        </div>
      </div>
      <div className={`flex flex-1 scoreFrame`}>
        <div className={`w-[290px] h-[290px] rounded-[18px] mr-11 flex-1`}>
          {data?.name ? (
            <Jdenticon
              size="290"
              value={
                data?.name
                  ? `${data.name.firstName} ${data.name.lastName}`
                  : 'Nickname'
              }
            />
          ) : (
            <div className={`flex justify-center items-center h-full`}>
              Loading...
            </div>
          )}
        </div>
        <div>
          <div>
            <span
              className={`font-normal text-[29px] color-[#23222c]`}
              style={{ fontWeight: 700 }}
            >
              {data?.name
                ? `${data.name.firstName} ${data.name.lastName}`
                : 'Nickname'}
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
                score={data2 ? data2.data.score.createIssue : 0}
                title={'Create Issues'}
              />
              <ScoreBoard
                className={`col-span-2`}
                color={'#00FF38'}
                score={data2 ? data2.data.score.resolveIssue : 0}
                title={'Resolve issues'}
              />
              <ScoreBoard
                className={`col-span-2`}
                color={'#E9488B'}
                score={data2 ? data2.data.score.createCodeReview : 0}
                title={'Create Code review'}
              />
              <ScoreBoard
                className={`col-span-2`}
                color={'#21D9CE'}
                score={data2 ? data2.data.score.mergeMr : 0}
                title={'Merge MR'}
              />
              <TotalScoreBoard
                className={`col-span-4`}
                color={'#377FFF'}
                score={data2 ? data2.data.score.total : 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Personal
