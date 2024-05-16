import { NextPage } from 'next';
import { ParallaxProvider } from 'react-scroll-parallax';
import Cover from '../../components/chapter1/Cover';
import Chapter1 from '../../components/chapter1/Chapter1';

const App: NextPage = () => {
  return (
    <ParallaxProvider>
      <Cover />
      <Chapter1/>
    </ParallaxProvider>
  )
}

export default App;
