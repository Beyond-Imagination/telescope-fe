// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export interface IRankingApi {
    type: string
    size: number
    from: string
    to: string
    rankings: IRanking[]
}

export interface IUserScore {
    userId: string
    from: string
    to: string
    score: IScore
}

export interface IRanking {
    id: string
    name: string
    score: IScore
    profilePicture: string
}

export interface IScore {
    total: number
    createIssue: number
    resolveIssue: number
    createCodeReview: number
    mergeMr: number
    codeReviewDiscussion: number
    acceptCodeReview: number
    receiveStar: number
}

export interface ICodeLineRankingApi {
    size: number
    from: string
    to: string
    codeLines: ICodeLineRanking[]
}

export interface ICodeLineRanking {
    id: string
    name: string
    codeLines: ICodeLine
    profilePicture: string
}

export interface ICodeLine {
    addedLines: number
    deletedLines: number
    total: number
}
