import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (<>
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
            />
            <meta name="description" content="Description" />
            <meta name="keywords" content="Keywords" />
            <title>Bayes Feed</title>

            <link rel="manifest" href="/manifest.json" />
            <link
                href="/icons/icon-256x256.png"
                rel="icon"
                type="image/png"
                sizes="256x256"
            />
            <link rel="apple-touch-icon" href="/icons/icon-256x256.png"></link>
            <meta name="theme-color" content="#ee802f" />
        </Head>
        <Component {...pageProps} />
    </>)
}

export default MyApp
