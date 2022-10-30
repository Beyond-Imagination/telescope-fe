import Typography from '../typography'
import { IType } from '../common/MainTitle'
import Information from '../common/Information'

interface IRankingTitle {
  types: IType[]
}

function RankingTitle({ types }: IRankingTitle) {
  return (
    <div className={`mb-3 flex justify-between`}>
      <div className={`flex items-center pl-3`}>
        <span className="text-[14px] font-bold text-[#171A3D] mr-[14px]">
          Ranking
        </span>
        <Information className={`mr-4`}></Information>
      </div>
      <div className={`flex gap-[30px] items-center`}>
        {types.map((value, index) => (
          <div key={index} className={`flex items-center gap-1`}>
            <div
              className={`w-2.5 h-2.5 rounded-xl`}
              style={{
                backgroundColor: value.active ? value.color : '#ABABAB',
              }}
            ></div>
            <div>
              <Typography
                color={value.active ? undefined : '#ABABAB'}
                type={'text1'}
              >
                {value.display}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RankingTitle
