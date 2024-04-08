//main.jsx
import './index.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import Cover from './Cover';
import Bmp from './chapter3/Bmp';
import { ParallaxProvider } from 'react-scroll-parallax';
//import Demo from './Demo';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParallaxProvider>
      <h1>Coming soon...</h1>
      <a href="https://github.com/yong/lost-language-of-the-machines">Check out our project on github</a>
      <Bmp/>
    </ParallaxProvider>
  </React.StrictMode>,
)
