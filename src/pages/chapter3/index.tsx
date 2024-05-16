import { NextPage } from 'next';

import withCover from '../../components/withCover';
import Chapter3 from './Chapter3';

const Main = withCover(Chapter3, '/chapter3/pixelart.jpg');

const App: NextPage = () => {
  return <Main/>;
}

export default App;
