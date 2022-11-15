import Axios from 'axios'
import { IOrganization, IUser } from '../../types/space'

export function getOrganization(serverUrl: string, accessToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  }
  return Axios.get<IOrganization>(
    `${serverUrl}/api/http/organization`,
    config
  ).then((data) => data.data)
}

export function getMe(serverUrl: string, accessToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  }
  return Axios.get<IUser>(
    `${serverUrl}/api/http/team-directory/profiles/me`,
    config
  ).then((data) => data.data)
}
