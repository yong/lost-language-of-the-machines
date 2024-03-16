//main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import Cover from './Cover';
import Chapter1 from './chapter1/Chapter1';
import { ParallaxProvider } from 'react-scroll-parallax';
//import Demo from './Demo';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParallaxProvider>
      <Cover />
      <Chapter1/>
    </ParallaxProvider>
  </React.StrictMode>,
)
