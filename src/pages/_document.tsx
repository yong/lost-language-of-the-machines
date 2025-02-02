import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link href='https://fonts.googleapis.com/css?family=VT323' rel='stylesheet'/>        
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}