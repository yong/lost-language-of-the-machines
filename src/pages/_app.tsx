import type { AppProps } from 'next/app';
import Head from 'next/head'; // Import the Head component
import Script from 'next/script';
import '../global.css'; // Import your global styles if you have any

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-ZJ7TNMPC51"/>
        <Script strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZJ7TNMPC51');
        `}
        </Script>
        <Script src="https://kit.fontawesome.com/b51c8c9efe.js" crossOrigin="anonymous"/>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A book that teach kids fundementals of computer science."/>
        <title>Lost Language of the Machines</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;