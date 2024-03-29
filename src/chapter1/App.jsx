import "./App.css";
import Cover from '../Cover';
import Chapter1 from './Chapter1';
import Homework from './Homework';
import { ParallaxProvider } from 'react-scroll-parallax';
import transition from '../transition';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

const Part1 = () => {
  return (
    <ParallaxProvider>
      <Cover />
      <Chapter1/>
    </ParallaxProvider>
  )
}

const Part1Animated = transition(Part1);

const App = () => {
    const location = useLocation();
    return (
        <>
            <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route index element={<Part1Animated />} />
                <Route path="/chapter1/homework" element={<Homework />} />
            </Routes>
            </AnimatePresence>
        </>
    )
}

export default App;
