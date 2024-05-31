import { NextPage } from 'next';
import Head from 'next/head';

import ClockFont from '@/components/demo/ClockFont';

const App: NextPage = () => {
  return (
    <div className='text-center p-12'>
      <Head>
        <title>Coming Soon - Lost Language of the Machines</title>
      </Head>
      <ClockFont chars="coming soon"/><br/>
      <p>Watch our <a className="text-blue-500 underline hover:text-blue-800" href="http://github.com/yong/LostLanguageOfTheMachines">github page</a> for updates</p>
    </div>
  );
}

export default App;
