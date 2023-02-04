import Head from 'next/head'
import MainTitle from '../components/common/MainTitle'
import Image from 'next/image'
import LogoPic from '../assets/logo.png'
import TelescopeImg from '../assets/telescope.png'
import Link from 'next/link'

interface ErrorProps {
  statusCode: number
  message: string
}

const ErrorPage = ({ statusCode, message }: ErrorProps) => {
  return (
    <div className={`h-[100vh] flex flex-col`}>
      <div
        className={`px-[55px] py-[16px] border-b border-[#BCBCBC] flex justify-between bg-[#23222C] relative`}
      >
        <div className={`flex items-center `}>
          <div className={`w-[59px] h-[59px] mr-[20px]`}>
            <Image src={LogoPic} alt={`logo`}></Image>
          </div>
          <div className={`flex flex-col`}>
            <div className={`mb-0.5`}>
              <span
                className={`font-normal text-[21px] mr-3.5`}
                style={{ fontWeight: 600, color: 'white' }}
              >
                {'Telescope Error Page'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`justify-center flex items-center flex-1 flex-col`}>
        <Image src={TelescopeImg} alt={`telescope`}></Image>
        <div>
          <span className={`text-[62px] font-extrabold text-[#23222C]`}>
            {statusCode}
          </span>
        </div>
        <div>
          <span className={`text-[32px] font-bold text-[#23222C]`}>
            {message}
          </span>
        </div>
        <div className={`justify-center flex items-center`}>
          <span>
            <Link href="/">{`Return to the Home`}</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res.data ? res.data.status : err ? err.statusCode : 404
  if (statusCode == 404)
    return {
      statusCode,
      message: 'Not Found',
    }
  const message = res.data ? res.data.message : 'Internal Server Error'
  return { statusCode, message }
}

export default ErrorPage
