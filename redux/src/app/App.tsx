import React from 'react';
import { Routes, Route } from 'react-router';
import About from '../about/About';
import Home from '../home/Home';
import PageNotFound from '../PageNotFound';
import './app.css';
import Header from './Header';

type AppProps = {

};

const App: React.FC<AppProps> = (props) => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;