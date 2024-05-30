import { NextPage } from 'next';
import Head from 'next/head';
import withCover from '../../components/common/withCover';
import Chapter2 from '../../components/chapter2/Chapter2';

const Main = withCover(Chapter2, '/chapter2/ascii.jpg');

const App: NextPage = () => {
  return (<>
    <Head>
        <title>Chapter 2 - Lost Language of the Machines</title>
    </Head>
    <Main/>
  </>)
}

export default App;
