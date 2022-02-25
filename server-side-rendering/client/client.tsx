import ReactDOM from 'react-dom';

export function App() {
  return (
    <div>
      <h1>Cats are love !</h1>
    </div>
  );
}

ReactDOM.render(
  <App />,                                // application component, we can split it if needed
  document.querySelector("#container")    // place it inside the contaier in the index.html
);