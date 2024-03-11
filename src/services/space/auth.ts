import { ICredential } from '@/types'

export default function getCredential(): Promise<ICredential | null> {
    return new Promise(resolve => {
        if (typeof window !== 'undefined') {
            const channel = new MessageChannel()
            channel.port1.onmessage = e => resolve(e.data)
            window.parent.postMessage(
                {
                    type: 'GetUserTokenRequest',
                    permissionScope: 'global:Profile.View',
                    askForConsent: true,
                },
                '*',
                [channel.port2],
            )
        } else {
            resolve(null)
        }
    })
}
