import React from 'react';
import './app.css';
import { Routes, Route } from 'react-router';
import About from '../about/About';
import CoursePage from '../courses/CoursePage';
import Home from '../home/Home';
import PageNotFound from '../PageNotFound';
import Header from './Header';
import CatFactsView from '../facts/CatFacts';

const App: React.FC = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/facts/cats" element={<CatFactsView />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;