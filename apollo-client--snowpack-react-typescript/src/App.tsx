import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateAttendance from './attendance/CreateAttendance';
import Home from './Home';
import Navigation from './Navigation';
import NotFound from './NotFound';
import StatisticsDashboard from './statistics/StatisticsDashboard';

interface AppProps { }

function App({ }: AppProps) {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance/create" element={<CreateAttendance />} />
        <Route path="/statistics" element={<StatisticsDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
