import { NextPage } from 'next';
import Head from 'next/head';
import { ParallaxProvider } from 'react-scroll-parallax';
import Cover from '../../components/chapter1/Cover';
import Chapter0 from '../../components/chapter0/Chapter0';

const App: NextPage = () => {
  return (
    <ParallaxProvider>
      <Head>
        <title>Chapter 0 - Lost Language of the Machines</title>
      </Head>
      <Cover />
      <Chapter0/>
    </ParallaxProvider>
  )
}

export default App;
