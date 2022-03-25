import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Cats } from "./Cats";
import { Shelters } from "./Shelters";
import { NavigationError } from './NavigationError';
import { Shelter } from './components/Shelter';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="cats" element={<Cats />}/>

        <Route path="shelters" element={<Shelters />}>
          <Route 
            index
            element={
              <p>Select a Shelter</p>
            }
          />
          <Route path=":shelterId" element={<Shelter />} />

        </Route>

        <Route path='*' element={<NavigationError />} />

      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);