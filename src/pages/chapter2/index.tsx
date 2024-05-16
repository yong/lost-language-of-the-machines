import { NextPage } from 'next';
import withCover from '../../components/common/withCover';
import Chapter2 from '../../components/chapter2/Chapter2';

const Main = withCover(Chapter2, '/chapter2/ascii.jpg');

const App: NextPage = () => {
  return <Main/>;
}

export default App;
