import Typography from '../typography'
import { IType } from '../common/MainTitle'
import Information from '../common/Information'

interface IRankingTitle {
  types: IType[]
}

function RankingTitle({ types }: IRankingTitle) {
  return (
    <div className={`mb-3 flex justify-between`}>
      <div className={`flex items-center`}>
        <Information className={`mr-4`}></Information>
        <span className="text-[19px] font-bold text-[#171A3D]">
          Ranking Dashboard
        </span>
      </div>
      <div className={`flex gap-[46px] items-center`}>
        {types.map((value, index) => (
          <button
            key={index}
            className={`flex items-center gap-1`}
            // onClick={(e) => {
            //   let temp = [
            //     ...types.filter((value1) => value1.name != value.name),
            //     {
            //       ...types.filter((value1) => value1.name == value.name)[0],
            //       active: !value.active,
            //     },
            //   ]
            //
            //   setTypes(temp.sort((a, b) => a.priority - b.priority))
            // }}
          >
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
          </button>
        ))}
        <Information></Information>
      </div>
    </div>
  )
}
export default RankingTitle