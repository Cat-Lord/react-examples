import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        { /* apply our custom style taken from tailwind.config.js ! */}
        <h1 className="text-3xl font-bold m-3 text-primary">This is Tailwind !</h1>
        <p>
          Edit <code className="text-blue-450">src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
