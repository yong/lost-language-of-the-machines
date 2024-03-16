//main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import Chapter2 from './chapter2/Chapter2';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
//import Demo from './Demo';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParallaxProvider>
      <ParallaxBanner
        layers={[
          { image: './ascii.jpg' },
          {
            speed: -20,
            children: (
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="backdrop-blur-sm text-center font-bold text-white z-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                  Lost Language of the Machines
                </h1>
              </div>
            ),
          },
        ]}
        style={{ height: '100vh' }}
      />
      <Chapter2/>
    </ParallaxProvider>
  </React.StrictMode>,
)
