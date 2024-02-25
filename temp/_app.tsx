import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import ErrorBoundary from '../components/common/ErrorBoundary'

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: { queries: { useErrorBoundary: true } },
            }),
    )
    return (
        <>
            <ErrorBoundary>
                <QueryClientProvider client={queryClient}>
                    <Head>
                        <title>Telescope</title>
                        <meta name="description" content="Telescope" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </QueryClientProvider>
            </ErrorBoundary>
        </>
    )
}

export default MyApp
