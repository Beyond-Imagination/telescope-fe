export interface IOrganization {
  id: string
  orgId: string
  name: string
  slogan: string
  logoId: string
  createdAt: number
  timezone: {
    id: string
  }
}

export interface IUser {
  id: string
  username: string
  name: {
    firstName: string
    lastName: string
  }
  speaksEnglish: boolean
  smallAvatar: string
  avatar: string
  profilePicture: string
  languages: [
    {
      name: {
        firstName: string
        lastName: string
      }
      language: {
        id: string
      }
      languageCode: string
    }
  ]
  archived: boolean
  notAMember: boolean
  joined: {
    iso: string
    year: number
    month: number
    day: number
  }
  external: boolean
}
