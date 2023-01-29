import Jdenticon from 'react-jdenticon'
import Image from 'next/image'
import { IRanking } from '../../pages/api/rankings'

interface StatProps {
  value: IRanking
}

function PersonStat({ value }: StatProps) {
  if (!value) {
    return null
  }
  return (
    <div
      className={`w-[286px] h-[565px] shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)] rounded px-6 `}
    >
      <div className={`py-6`}>
        <div className={`flex w-[168px] gap-1 align-middle items-center ml-1`}>
          <div>
            {value.profilePicture != null ? (
              <Image
                src={`https://my-company.jetbrains.space/d/${value.profilePicture}`}
              ></Image>
            ) : (
              <Jdenticon size="80" value={value.name} />
            )}
          </div>
          <div className={`align-center flex-col flex ml-3`}>
            <div className={`font-bold`}>{value.name}</div>
            <div>{value.name}</div>
          </div>
        </div>
        <div className={`flex w-[286px] h-[230px]`}></div>
      </div>
      <div>
        <div className={``}>Personal Tags Score</div>

        <div
          className={`grid grid-cols-4 text-blue-500 align-middle text-center font-bold mt-2`}
        >
          <div className={`col-span-1`}>{value.score.createIssue}</div>
          <div className={`col-span-1`}>{value.score.resolveIssue}</div>
          <div className={`col-span-1`}>{value.score.mergeMr}</div>
          <div className={`col-span-1`}>{value.score.createCodeReview}</div>
        </div>

        <div
          className={`grid grid-cols-4 align-middle text-center text-[0.5rem] text-stone-400	`}
        >
          <div className={`col-span-1`}>Create Issue</div>
          <div className={`col-span-1`}>Resolve Issue</div>
          <div className={`col-span-1`}>Merge MR</div>
          <div className={`col-span-1`}>Create Code Review</div>
        </div>
      </div>

      <div className={`mt-5`}>
        <div className={``}>Total Score</div>
        <div className={`text-[#E9488B] text-[2rem] font-bold ml-10`}>
          {(value.score.createIssue +
            value.score.resolveIssue +
            value.score.mergeMr +
            value.score.createCodeReview) /
            4}
        </div>
      </div>
    </div>
  )
}

export default PersonStat
