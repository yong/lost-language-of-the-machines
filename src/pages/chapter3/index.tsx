import { NextPage } from 'next';
import Head from 'next/head';
import withCover from '../../components/common/withCover';
import Chapter3 from '../../components/chapter3/Chapter3';

const Main = withCover(Chapter3, '/chapter3/pixelart.jpg');

const App: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chapter 3 - Lost Language of the Machines</title>
      </Head>
      <Main/>
    </>
  )
}

export default App;
