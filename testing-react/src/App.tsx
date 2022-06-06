import React from 'react';
import CatSelector from './catSelection/CatSelector';
import cats from './catSelection/catsList';
import Select from './Select';
import SomePage from './SomePage';

function App() {
  const options = ["option a", "option b", "option c"];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Testing React</h1>
        <SomePage message='Welcome to this page' />
      </header>
      <Select options={options} />

      <CatSelector cats={cats} />

    </div>
  );
}

export default App;
