import Jdenticon from 'react-jdenticon'
import { useCallback, useEffect, useState } from 'react'
import * as spaceAPI from '../../utils/api/spaceApi'
import { useQuery } from '@tanstack/react-query'
import axios from '../../utils/api'
import { convertDateByType, dateToString } from '../../utils/date'
import Information from '../common/Information'
import { fetchScoreByUserId } from '../../utils/api/myScoreApi'

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
  const { data: userData } = useQuery(
    ['profile', 'me', userTokenData],
    () => fetchProfileMe(),
    {
      enabled: !!userTokenData?.serverUrl,
    }
  )
  const [img, setImg] = useState(null)

  const { data: scoreData } = useQuery(
    ['score', timeType],
    () => fetchScoreByUserIdHook(),
    {
      enabled: !!userData?.id,
    }
  )
  const fetchProfileMe = useCallback(() => {
    if (userTokenData?.token)
      return spaceAPI.getMe(userTokenData.serverUrl, userTokenData.token)
  }, [userTokenData])

  let fromDate = new Date()
  let tomorrow = new Date()
  tomorrow.setDate(fromDate.getDate() + 1)

  const fetchScoreByUserIdHook = useCallback(() => {
    if (userTokenData?.token && userData)
      return fetchScoreByUserId(
        userData.id,
        userTokenData.serverUrl,
        convertDateByType(timeType, fromDate),
        tomorrow
      )
  }, [userTokenData, userData, timeType])

  useEffect(() => {
    axios({
      method: 'get',
      url: `${userTokenData.serverUrl}/d/${userData?.profilePicture}`,
      headers: {
        Authorization: `Bearer ${userTokenData.token}`,
      },
      responseType: 'arraybuffer',
    }).then((res) => {
      let data = new Uint8Array(res.data)
      if (data) {
        // @ts-ignore
        let raw = String.fromCharCode.apply(null, data)
        let base64 = btoa(raw)
        let src = 'data:image;base64,' + base64
        // @ts-ignore
        setImg(src)
      }
    })
  }, [])

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
          {userData?.name ? (
            img ? (
              <div></div>
            ) : (
              <Jdenticon
                size="290"
                value={
                  userData?.name
                    ? `${userData.name.firstName} ${userData.name.lastName}`
                    : 'Nickname'
                }
              />
            )
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
              {userData?.name
                ? `${userData.name.firstName} ${userData.name.lastName}`
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
                score={scoreData ? scoreData.data.score.createIssue : 0}
                title={'Create Issues'}
              />
              <ScoreBoard
                className={`col-span-2`}
                color={'#00FF38'}
                score={scoreData ? scoreData.data.score.resolveIssue : 0}
                title={'Resolve issues'}
              />
              <ScoreBoard
                className={`col-span-2`}
                color={'#E9488B'}
                score={scoreData ? scoreData.data.score.createCodeReview : 0}
                title={'Create Code review'}
              />
              <ScoreBoard
                className={`col-span-2`}
                color={'#21D9CE'}
                score={scoreData ? scoreData.data.score.mergeMr : 0}
                title={'Merge MR'}
              />
              <TotalScoreBoard
                className={`col-span-4`}
                color={'#377FFF'}
                score={scoreData ? scoreData.data.score.total : 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Personal
