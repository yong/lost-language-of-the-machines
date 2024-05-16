import { NextPage } from 'next';
import withCover from '../../components/withCover';
import Chapter2 from './Chapter2';

const Main = withCover(Chapter2, '/chapter2/ascii.jpg');

const App: NextPage = () => {
  return <Main/>;
}

export default App;
