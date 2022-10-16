import Typography from '../typography'
import Image from 'next/image'
import LogoPic from '../../assets/logo.png'

export interface IType {
  name: string
  display: string
  color: string
  active: boolean
  priority: number
}

function MainTitle() {
  return (
    <div
      className={`px-[55px] py-[30px] border-b border-[#BCBCBC] flex justify-between`}
    >
      <div className={`flex items-center`}>
        <div className={`w-[59px] h-[59px] mr-[20px]`}>
          <Image src={LogoPic} alt={`logo`}></Image>
        </div>
        <div className={`flex flex-col`}>
          <div className={`mb-0.5`}>
            <Typography type={'h1'} className={`text-[#3535A6]`}>
              TELESCOPE
            </Typography>
          </div>
          <div>
            <Typography type={'caption'} className={`text-[#AAAAD0]`}>
              Beyond_Imagination
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <Typography type={'text2'} className={`text-[#B4B4B4]`}>
          <span>{`Created by `}</span>
          <span className={`font-bold`}>Beyond_Imagaination</span>
        </Typography>
      </div>
    </div>
  )
}
export default MainTitle
