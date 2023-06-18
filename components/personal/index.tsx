import Jdenticon from 'react-jdenticon'
import { useCallback, useEffect } from 'react'
import * as spaceAPI from '../../utils/api/spaceApi'
import { useQuery } from '@tanstack/react-query'
import { convertDateByType } from '../../utils/date'
import Information from '../common/Information'
import { fetchScoreByUserId } from '../../utils/api/myScoreApi'

const ScoreBoard = ({ className, color, score, title }: any) => {
  return (
      <div
          className={`h-[160px] flex justify-center items-center rounded-[16px] ${className} `}
          style={{ backgroundColor: color, textAlign: 'center' }}
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
          className={`h-[110px] flex items-center rounded-[16px] px-11 ${className} `}
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

function Personal({
                    userData,
                    scoreData,
                    profileMap,
                    timeType,
                    setTimeType,
                  }: any) {
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
        <div
            className={`flex flex-1 scoreFrame`}
            style={{ justifyContent: 'space-between' }}
        >
          <div className={`w-[290px] h-[290px] rounded-[18px] mr-11`}>
            {userData?.name ? (
                userData.profilePicture ? (
                    <div>
                      <img
                          className={`rounded-[16px]`}
                          src={profileMap.get(userData.profilePicture)}
                          style={{ height: 290, width: 290 }}
                          alt="picture"
                      />
                    </div>
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
          <div className={`flex-1 max-w-[491px]`}>
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
                    score={scoreData ? scoreData.score.createIssue : 0}
                    title={'Create Issues'}
                />
                <ScoreBoard
                    className={`col-span-2`}
                    color={'#00FF38'}
                    score={scoreData ? scoreData.score.resolveIssue : 0}
                    title={'Resolve issues'}
                />
                <ScoreBoard
                    className={`col-span-2`}
                    color={'#E9488B'}
                    score={scoreData ? scoreData.score.createCodeReview : 0}
                    title={'Create Code review'}
                />
                <ScoreBoard
                    className={`col-span-2`}
                    color={'#21D9CE'}
                    score={scoreData ? scoreData.score.mergeMr : 0}
                    title={'Merge MR'}
                />
                <ScoreBoard
                    className={`col-span-2`}
                    color={'#F7CD3F'}
                    score={scoreData ? scoreData.score.receiveStar : 0}
                    title={'Receive Star'}
                />
                <ScoreBoard
                    className={`col-span-2`}
                    color={'#377FFF'}
                    score={scoreData ? scoreData.score.total : 0}
                    title={'Total Score'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Personal
