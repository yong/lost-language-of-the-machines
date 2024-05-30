//_app.tsx
import type { AppProps } from 'next/app';
import Head from 'next/head'; // Import the Head component
import Script from 'next/script';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css'; // Import your global styles if you have any

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps)  => {
    return (
        <>
            <Head>
                <link rel="icon" type="image/svg+xml" href="/icon.svg" />
                <link href='https://fonts.googleapis.com/css?family=VT323' rel='stylesheet'/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="An interactive storybook that aims to teach children the fundamentals of computing. . Set 500 years in the future, the narrative follows two curious friends—one a robot, the other human—as they delve into the history of our computers, a subject now ancient to them." />
                <title>Lost Language of the Machines</title>
            </Head>
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-ZJ7TNMPC51" />
            <Script strategy="afterInteractive" id="google-analytics-script">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZJ7TNMPC51');
            `}
            </Script>
            <Script src="https://kit.fontawesome.com/b51c8c9efe.js" crossOrigin="anonymous" />
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </>
    );
}

export default MyApp;