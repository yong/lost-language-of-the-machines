//main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import ResetScrollWrapper from './common/ResetScrollWrapper';
import Cover from './Cover';
import Chapter1 from './chapter1/Chapter1';
import Homework from './chapter1/Homework';
import { ParallaxProvider } from 'react-scroll-parallax';
//import transition from '../transition';
//import { AnimatePresence } from 'framer-motion';


const Part1 = () => {
  return (
    <ParallaxProvider>
      <Cover />
      <Chapter1/>
    </ParallaxProvider>
  )
}

//const Part1Animated = transition(Part1);

const App = () => {
    const location = useLocation();
    return (
        <>
            {/*<AnimatePresence mode='wait'>*/}
            <Routes location={location} key={location.pathname}>
                <Route index element={<Part1 />} />
                <Route path="homework" element={<Homework />} />
            </Routes>
            {/*</AnimatePresence>*/}
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HashRouter>
        <ResetScrollWrapper>
          <Routes>
            <Route path='/*' element={<App/>} />
          </Routes>
        </ResetScrollWrapper>
      </HashRouter>
  </React.StrictMode>,
)
