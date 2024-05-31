import { NextPage } from 'next';

import withCover from '../../components/common/withCover';

import ClockFont from '@/components/demo/ClockFont';

const App: NextPage = () => {
  return (
    <div className='text-center p-12'>
    <ClockFont chars="coming soon"/><br/>    
    <p>Watch our <a className="text-blue-500 underline hover:text-blue-800" href="http://github.com/yong/LostLanguageOfTheMachines">github page</a> for updates</p>
    </div>
  );
}

export default App;
