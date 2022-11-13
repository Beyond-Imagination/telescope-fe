import { IType } from '../common/MainTitle'
import Information from '../common/Information'
import { BoardTitle } from '../main/SummaryStat'
import styled from 'styled-components'

interface IRankingTitle {
  types: IType[]
}

const LegendTitle = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: #23222c;
`

function RankingTitle({ types }: IRankingTitle) {
  return (
    <div className={`mb-3 flex justify-between`}>
      <div className={`flex items-center pl-3`}>
        <BoardTitle className="mr-3.5 ">Ranking</BoardTitle>
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
              <LegendTitle>{value.display}</LegendTitle>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RankingTitle
