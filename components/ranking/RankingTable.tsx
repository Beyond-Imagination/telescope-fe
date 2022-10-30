import Jdenticon from 'react-jdenticon'
import { Chart } from 'react-google-charts'
import { IRanking } from '../../pages/api/rankings'
import Typography from '../typography'
import BookMarkIcon from '../../assets/bi_bookmark-star-fill.svg'
import StackBarchart from './StackBarchart'
interface IRankingTable {
  rankings?: IRanking[]
}

const getRankingColor = (ranking: number) => {
  switch (ranking) {
    case 1:
      return `#FFD233`
    case 2:
      return `#C9C9C9`
    case 3:
      return `#C65300`
    case 4:
      return `#8B6D00`
    case 5:
      return `#8B6D00`
    default:
      return `#8B6D00`
  }
}

function RankingTable({ rankings }: IRankingTable) {
  return (
    <div
      className={`w-full h-full shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)] rounded`}
    >
      <div
        className={`px-[40px] py-2 shadow-[0_1px_1px_0px_rgba(0,0,0,0.25)]  pl-10 pr-[50px]`}
      >
        <div className={`px-9 grid grid-cols-10`}>
          <div className={`col-span-2`}>
            <Typography className={`text-[#B0B0B0]`} type={`text1`}>
              Ranking
            </Typography>
          </div>
          <div className={`col-span-3`}>
            <Typography className={`text-[#B0B0B0]`} type={`text1`}>
              Members
            </Typography>
          </div>
          <div className={`col-span-4`}>
            <Typography className={`text-[#B0B0B0]`} type={`text1`}>
              Productivity Rate
            </Typography>
          </div>
          <div className={`col-span-1`}>
            <Typography className={`text-[#B0B0B0]`} type={`text1`}>
              Overall
            </Typography>
          </div>
        </div>
      </div>
      <div
        className={`px-[40px] bg-[#F6F7FA] py-1 max-h-[450px] overflow-y-auto`}
      >
        {!rankings && (
          <div className={`flex justify-center items-center py-4`}>
            Loading...
          </div>
        )}
        {rankings && rankings.length == 0 && (
          <div className={`flex justify-center items-center py-4`}>
            No Data...
          </div>
        )}
        {rankings &&
          rankings?.map((ranking, index) => (
            <div key={index} className={`flex`}>
              <div
                key={ranking.name}
                className={`flex flex-1 items-center grid grid-cols-10 px-9 bg-white mb-1 rounded-l-xl`}
              >
                <div className={`col-span-2 flex items-center`}>
                  <div className={`mr-[33px] flex items-center`}>
                    <BookMarkIcon
                      fill={getRankingColor(index + 1)}
                    ></BookMarkIcon>
                  </div>
                  <div className={`flex items-center`}>
                    <div>
                      <Typography type={`h3`} className={`text-[#5F6174]`}>
                        {String(index + 1).padStart(2, '0')}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className={`flex col-span-3 gap-1`}>
                  <div className={`mr-[41px]`}>
                    <Jdenticon size="40" value={ranking.name} />
                  </div>
                  <div className={`items-center flex`}>
                    <Typography type={`h4`} className={`text-[#5F6174]`}>
                      {ranking.name}
                    </Typography>
                  </div>
                </div>
                <div className={`flex col-span-4`}>
                  <StackBarchart
                    maxValue={rankings[0].score.total}
                    ranking={ranking}
                  ></StackBarchart>
                </div>
                <div className={`flex col-span-1`}>
                  <Typography type={`h2`} className={`text-[#5F6174]`}>
                    {String(ranking.score.total).padStart(2, '0')}
                  </Typography>
                </div>
              </div>
              <div className={`w-2.5 bg-[#23222C] mb-1 rounded-r-xl`}></div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default RankingTable
