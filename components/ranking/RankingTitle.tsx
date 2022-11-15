import { IType } from '../common/MainTitle'
import Information from '../common/Information'

interface IRankingTitle {
  types: IType[]
}

function RankingTitle({ types }: IRankingTitle) {
  return (
    <div className={`mb-3 flex justify-between`}>
      <div className={`flex items-center pl-3`}>
        <span
          className={`font-normal text-[17px] mr-3.5`}
          style={{ fontWeight: 700, color: '#23222C' }}
        >
          Ranking
        </span>
        <Information
          className={`mr-4`}
          informationText={'Ranking'}
        ></Information>
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
              <span
                className={`font-normal font-semibold text-[13px] color-[#23222c]`}
              >
                {value.display}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RankingTitle
