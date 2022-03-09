import '../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { UseWalletProvider } from 'use-wallet'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                    integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </Head>
            <UseWalletProvider>
                <Component {...pageProps} />
            </UseWalletProvider>
        </>
    )
}
