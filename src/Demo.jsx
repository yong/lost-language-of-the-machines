//main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ParallaxProvider } from 'react-scroll-parallax';
import AnimatedFIFOList from './AnimatedFIFOList';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParallaxProvider>
      <AnimatedFIFOList/>
    </ParallaxProvider>
  </React.StrictMode>,
)
