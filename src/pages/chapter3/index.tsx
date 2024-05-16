import { NextPage } from 'next';

import withCover from '../../components/common/withCover';
import Chapter3 from '../../components/chapter3/Chapter3';

const Main = withCover(Chapter3, '/chapter3/pixelart.jpg');

const App: NextPage = () => {
  return <Main/>;
}

export default App;
