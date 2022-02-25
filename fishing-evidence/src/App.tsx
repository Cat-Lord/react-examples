import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {'Access-Control-Allow-Origin': '*'}
});

interface Fish {
  id: number;
  name: string;
}

function App() {

  const [fishArray, setFishArray] = useState([]);

  useEffect(() => {
    api.get("/fish/all")
       .then((response) => setFishArray(response.data))
       .catch(() => <p className="text-red-500 font-bold">Error fetching data.</p>)
  }, []); // run as cdm

  return (
    <div>
      { /* apply our custom style taken from tailwind.config.js ! */}
      <h1 className="text-3xl font-bold m-3 text-primary">This is Tailwind !</h1>
      <p>
        Edit <code className="text-blue-450">src/App.tsx</code> and save to reload.
      </p>

      <ul>
        {
          fishArray.map((value:Fish) => <li key={value.id}>{value.name}</li>)
        }
      </ul>

    </div>
  );
}

export default App;
