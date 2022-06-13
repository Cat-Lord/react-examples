import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateAttendance from './attendance/CreateAttendance';
import ErrorPage from './globalErrorHandling/ErrorPage';
import { useCheckConnectionQuery } from './graphql/generated/graphql-gen';
import Home from './Home';
import Navigation from './Navigation';
import Statistics from './statistics/Statistics';

interface AppProps { }

function App ({ }: AppProps) {
  const { error } = useCheckConnectionQuery();

  if (error)
    return <ErrorPage errorMessage='Server is not accessible' />;

  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance/create" element={<CreateAttendance />} />
        <Route path="/statistics" element={<Statistics />} />

        <Route path="*" element={<ErrorPage errorMessage='Page not found...' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
