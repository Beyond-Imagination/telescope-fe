import Jdenticon from 'react-jdenticon'
import { useQuery } from '@tanstack/react-query'

import { useCredential } from '@/hooks'
import { fetchProfileImage } from '../../../utils/api/homeApi'

interface props {
    className: string
    profilePicture?: string
    name?: string
    jdenticonSize: number
}

export default function ProfilePicture({ className, profilePicture, name, jdenticonSize }: props) {
    const credential = useCredential()
    const { data: profileImage } = useQuery({
        queryKey: ['ProfilePicture', profilePicture],
        queryFn: async () => await fetchProfileImage(credential.serverUrl, credential.token, profilePicture!),
        enabled: !!credential && !!profilePicture,
        staleTime: 1000 * 60 * 60, // 1 시간
    })

    return <>{profileImage ? <img className={className} src={profileImage} alt="picture" /> : <Jdenticon size={`${jdenticonSize}`} value={name} />}</>
}
