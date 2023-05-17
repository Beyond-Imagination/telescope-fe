export interface IStatApi {
  from: string
  to: string
  score: IStatScore
}

export interface IStatScore {
  total: number
  createIssue: number
  resolveIssue: number
  createCodeReview: number
  mergeMr: number
  receiveStar: number
}
