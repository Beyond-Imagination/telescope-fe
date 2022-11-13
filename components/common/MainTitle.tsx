import Typography from '../typography'
import Image from 'next/image'
import LogoPic from '../../assets/logo.png'
import {IOrganization} from "../../types/organization";

export interface IType {
  name: string
  display: string
  color: string
  active: boolean
  priority: number
}

interface IMainTitle {
  organization?: IOrganization
}

function MainTitle({organization}: IMainTitle) {
  return (
    <div
      className={`px-[55px] py-[16px] border-b border-[#BCBCBC] flex justify-between bg-[#23222C]`}
    >
      <div className={`flex items-center`}>
        <div className={`w-[59px] h-[59px] mr-[20px]`}>
          <Image src={LogoPic} alt={`logo`}></Image>
        </div>
        <div className={`flex flex-col`}>
          <div className={`mb-0.5`}>
            <Typography type={'h1'} className={`text-[#FFF]`}>
              {organization?.name}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MainTitle
