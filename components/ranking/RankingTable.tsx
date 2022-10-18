import Jdenticon from 'react-jdenticon'
import { Chart } from 'react-google-charts'
import { IRanking } from '../../pages/api/rankings'
import Typography from '../typography'
import BookMarkIcon from '../../assets/bi_bookmark-star-fill.svg'
import BookMarkLineIcon from '../../assets/bi_bookmark-star-line.svg'
interface IRankingTable {
  rankings: IRanking[]
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
      return ``
  }
}
function RankingTable({ rankings }: IRankingTable) {
  return (
    <div
      className={`w-full h-full shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)] rounded`}
    >
      <div
        className={`flex px-[26px] py-4 grid grid-cols-10 shadow-[0_1px_1px_0px_rgba(0,0,0,0.25)]  px-9`}
      >
        <div className={`flex col-span-2`}>
          <Typography className={`text-[#B0B0B0]`} type={`text1`}>
            Ranking
          </Typography>
        </div>
        <div className={`col-span-3`}>
          <Typography className={`text-[#B0B0B0]`} type={`text1`}>
            Name
          </Typography>
        </div>
        <div className={`col-span-4`}>
          <Typography className={`text-[#B0B0B0]`} type={`text1`}>
            Productivity
          </Typography>
        </div>
        <div className={`col-span-1`}>
          <Typography className={`text-[#B0B0B0]`} type={`text1`}>
            Score
          </Typography>
        </div>
      </div>
      {rankings.map((value, index) => (
        <div
          key={value.name}
          className={`flex items-center p-[26px] grid grid-cols-10 px-9`}
        >
          <div className={`col-span-2 flex items-center`}>
            <div className={`w-4 h-4 mr-[33px]`}>
              {index < 5 ? (
                <BookMarkIcon fill={getRankingColor(index + 1)}></BookMarkIcon>
              ) : (
                <BookMarkLineIcon></BookMarkLineIcon>
              )}
            </div>
            <div>
              <Typography type={`h3`} className={`text-[#5F6174]`}>
                {String(index + 1).padStart(2, '0')}
              </Typography>
            </div>
          </div>
          <div className={`flex col-span-3 gap-1`}>
            <div className={`mr-[41px]`}>
              <Jdenticon size="48" value={value.name} />
            </div>
            <div>
              <div className={`font-bold`}>{value.name}</div>
              <div>{value.name}</div>
            </div>
          </div>
          <div className={`flex col-span-4`}>
            <Chart
              chartType="BarChart"
              data={[
                ['Name', 'Score', { role: 'style' }],
                ['total', value.score.total, 'color: #387AF1'],
                [
                  'create_code_review',
                  value.score.create_code_review,
                  'color: #8000FF',
                ],
                ['create_issue', value.score.create_issue, 'color: #00FF38'],
                ['merge_mr', value.score.merge_mr, 'color: #3FF7C0'],
                ['resolve_issue', value.score.resolve_issue, 'color: #E9488B'],
              ]}
              // width="300px"
              height="58px"
              options={{
                legend: 'none',
                hAxis: {
                  gridlines: {
                    count: 0,
                  },
                  textPosition: 'none',
                  baselineColor: 'transparent',
                },
                vAxis: {
                  baselineColor: 'transparent',
                  gridlines: {
                    count: 0,
                  },
                  textPosition: 'none',
                },
                bar: {
                  groupWidth: '55%',
                },
                chartArea: { width: '100%', height: '100%' },
              }}
            />
          </div>
          <div className={`flex col-span-1`}>
            <Typography type={`h2`} className={`text-[#5F6174]`}>
              {String(value.score.total).padStart(2, '0')}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RankingTable
