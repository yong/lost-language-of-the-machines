import { NextPage } from 'next';
import { ParallaxProvider } from 'react-scroll-parallax';
import Cover from './Cover';
import Chapter1 from './Chapter1';

const App: NextPage = () => {
  return (
    <ParallaxProvider>
      <Cover />
      <Chapter1/>
    </ParallaxProvider>
  )
}

export default App;
