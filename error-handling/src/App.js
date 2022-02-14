import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import ClickableNumber from './components/ClickableNumber';

/**
 * No comment needed - read text in html :)
 */

function App() {
  return (
    <div className="App">
      <h1>Click on the numbers to increase the count.</h1>
      <div>
        <h2>Error boundary on two counters</h2>
        <small>This replaces both counters with error component when one of them throws an error.</small>
        <ErrorBoundary>
          <ClickableNumber />
          <ClickableNumber />
        </ErrorBoundary>
      </div>

      <div>
        <h2>Error boundary on separate counters</h2>
        <small>This replaces only the counter, that threw an error. Others won't get affected</small>
        
        <ErrorBoundary> <ClickableNumber /></ErrorBoundary>
        <ErrorBoundary> <ClickableNumber /></ErrorBoundary>
        <ErrorBoundary> <ClickableNumber /></ErrorBoundary>
        <ErrorBoundary> <ClickableNumber /></ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
