'use client'

import '../../styles/globals.css'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Newrelic from '../../components/common/newrelic'
import Header from '@/components/header/Header'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            useErrorBoundary: true,
        },
    },
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <html lang="en">
                <Newrelic />
                <body>
                    <QueryClientProvider client={queryClient}>
                        <Header />
                        {children}
                    </QueryClientProvider>
                </body>
            </html>
        </>
    )
}
