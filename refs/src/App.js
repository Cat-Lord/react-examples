import TextInputWithFocus from './components/TextInputWithFocus';
import './App.css';

/**
 * 
 * Refs don't work on function components but we may use them inside them.
 * 
 */

function App() {
  return (
    <div className="App">
      <h2>Press focus to focus on the input withtou re-rendering.</h2>
      <TextInputWithFocus />
    </div>
  );
}

export default App;
