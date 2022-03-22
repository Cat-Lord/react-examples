import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);