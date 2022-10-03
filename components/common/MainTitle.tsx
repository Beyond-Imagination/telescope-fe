import Typography from '../typography'
import { useEffect } from 'react'

interface IMainTitle {
  types: IType[]
  setTypes: any
}

export interface IType {
  name: string
  display: string
  color: string
  active: boolean
  priority: number
}

function MainTitle({ types, setTypes }: IMainTitle) {
  return (
    <div className={`p-[30px] border-b border-[#BCBCBC]`}>
      <div className={`flex items-center`}>
        <div className={`w-[50px] h-[50px] bg-[#D9D9D9] mr-[25px] mb-6`}></div>
        <div>
          <Typography type={'h1'}>Telescope Leaderboard</Typography>
        </div>
      </div>
      <div className={`flex gap-[46px]`}>
        {types.map((value, index) => (
          <button
            key={index}
            className={`flex items-center gap-1`}
            onClick={(e) => {
              let temp = [
                ...types.filter((value1) => value1.name != value.name),
                {
                  ...types.filter((value1) => value1.name == value.name)[0],
                  active: !value.active,
                },
              ]

              setTypes(temp.sort((a, b) => a.priority - b.priority))
            }}
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
      </div>
    </div>
  )
}
export default MainTitle
