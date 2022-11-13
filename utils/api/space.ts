import Axios from 'axios'
import {IOrganization} from "../../types/organization";

export function getOrganization(serverUrl: string, accessToken: string) {
    const config = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        }
    }
    return Axios.get<IOrganization>(
        `${serverUrl}/api/http/organization`,
        config,
    )
}