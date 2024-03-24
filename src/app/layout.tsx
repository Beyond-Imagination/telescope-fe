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
                    <div className={`flex justify-center text-[#D9D9D9]`}>
                        <span>ⓒ 2022~2024 Beyond_Imagination All Rights Reserved. </span>
                    </div>
                </body>
            </html>
        </>
    )
}
