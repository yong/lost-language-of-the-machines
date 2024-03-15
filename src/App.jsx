//App.jsx
import React from 'react';
import Cover from './Cover';
import Chapter1 from './chapter1/Chapter1';
import { ParallaxProvider } from 'react-scroll-parallax';
//import Demo from './Demo';

function App() {
  return (
    <ParallaxProvider>
      <Cover />
      <Chapter1/>
    </ParallaxProvider>
  );
}

export default App;