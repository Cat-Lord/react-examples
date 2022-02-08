import './App.css';
import Box from './Box';

function App() {

    // this demonstrates code-spliting principles by not requiring the dependency globally but rather
    //  internaly when required (https://reactjs.org/docs/code-splitting.html)
    const axios = require('axios');
      
    // it is necessary, that the server allows CORS. We also need to provide CORS access header as shown below
    const box = axios.get("http://localhost:8080/component/get", { headers: {'Access-Control-Allow-Origin': '*'} })
                      .then((respone) => console.log(respone.data))
                      .catch((error) => console.log(error));
    console.log(box);

  return (
    <Box data={box} />
  );
}

export default App;
