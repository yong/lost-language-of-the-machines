import { NextPage } from 'next';
import Head from 'next/head';
import { ParallaxProvider } from 'react-scroll-parallax';
import Cover from '../../components/chapter1/Cover';
import Chapter1 from '../../components/chapter1/Chapter1';

const App: NextPage = () => {
  return (
    <ParallaxProvider>
      <Head>
        <title>Chapter 1 - Lost Language of the Machines</title>
      </Head>
      <Cover />
      <Chapter1/>
    </ParallaxProvider>
  )
}

export default App;
