'use client'

import '../../styles/globals.css'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Newrelic from '../../components/common/newrelic'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: { queries: { useErrorBoundary: true } },
            }),
    )
    return (
        <>
            <html lang="en">
                <Newrelic />
                <body>
                    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                </body>
            </html>
        </>
    )
}
