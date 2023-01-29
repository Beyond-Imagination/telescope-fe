import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { isInstanceOfAPIError } from './error'

//서버 사이드 렌더링 파트 에러 핸들링 로직
export default function withGetServerSideProps(
  getServerSideProps: GetServerSideProps
): GetServerSideProps {
  return async (context: GetServerSidePropsContext) => {
    try {
      return await getServerSideProps(context)
    } catch (error) {
      if (isInstanceOfAPIError(error)) {
        const { redirectUrl, notFound } = error
        if (notFound) {
          return {
            notFound: true,
          }
        }

        return {
          redirect: {
            destination: redirectUrl,
            permanent: false,
          },
        }
      }

      throw error
    }
  }
}
