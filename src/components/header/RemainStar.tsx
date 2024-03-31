import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useCredential } from '@/hooks'
import { getMe } from '@/api/space'
import { getRemainStar } from '@/api/telescope'

export default function RemainStar() {
    const credential = useCredential()
    const [timezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

    const { data: user } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getMe(credential.serverUrl, credential.token),
        refetchOnWindowFocus: false,
        enabled: !!credential,
    })

    const { data: remainStar } = useQuery({
        queryKey: ['remainStar'],
        queryFn: () => getRemainStar(credential.serverUrl, user!.id, timezone),
        refetchOnWindowFocus: false,
        enabled: !!user,
    })

    return (
        <div
            style={{
                borderRadius: '8px',
                border: `1px solid rgba(0, 0, 0, 0.05)`,
                backgroundColor: '#E4BD31',
                opacity: 1,
                height: 'fit-content',
                marginRight: '16px',
            }}
        >
            <span
                className={`text-[15px] font-normal`}
                style={{
                    fontWeight: 600,
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    padding: '4px',
                }}
            >
                <span className="ml-1 mr-1">You have</span>
                <span role="img" aria-label="star">
                    ⭐
                </span>
                <span className="ml-1 mr-1">{remainStar?.remainStar ? remainStar.remainStar : 5}</span>
            </span>
        </div>
    )
}
