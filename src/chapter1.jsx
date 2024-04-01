//main.jsx
import React from 'react'
import {useLayoutEffect} from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './chapter1/App';

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path='/*' element={<App/>} />
        </Routes>
        </Wrapper>
      </BrowserRouter>
  </React.StrictMode>,
)
