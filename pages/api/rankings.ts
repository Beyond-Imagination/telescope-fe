// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export interface IRankingApi {
  type: string
  size: number
  from: string
  to: string
  rankings: IRanking[]
}
export interface IRanking {
  id: string
  name: string
  score: IScore
}
export interface IScore {
  total: number
  create_issue: number
  resolve_issue: number
  create_code_review: number
  merge_mr: number
}

export default function fetchUsers(
  req: NextApiRequest,
  res: NextApiResponse<IRankingApi>
) {
  res.status(200).json({
    type: 'create_issue',
    size: 3,
    from: '2022-09-12',
    to: '2022-09-19',
    rankings: [
      {
        id: '1',
        name: '홍길동',
        score: {
          total: 52,
          create_issue: 21,
          resolve_issue: 16,
          create_code_review: 10,
          merge_mr: 5,
        },
      },
      {
        id: '2',
        name: '홍길서',
        score: {
          total: 52,
          create_issue: 21,
          resolve_issue: 16,
          create_code_review: 10,
          merge_mr: 5,
        },
      },
      {
        id: '3',
        name: '홍길남',
        score: {
          total: 52,
          create_issue: 21,
          resolve_issue: 16,
          create_code_review: 10,
          merge_mr: 5,
        },
      },
    ],
  })
}
