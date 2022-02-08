import './App.css';
import FilterableProductsTable from './components/FilterableProductsTable';


/**
  List of data:
    - The original list of products
    - The search text the user has entered
    - The value of the checkbox
    - The filtered list of products

  Important questions:
    - Is it passed in from a parent via props? If so, it probably isn’t state.
    - Does it remain unchanged over time? If so, it probably isn’t state.
    - Can you compute it based on any other state or props in your component? If so, it isn’t state.

  After that identify where the state should be stored.
 */

function App() {
  return (
    <div className="App">
      <FilterableProductsTable />  
    </div>
  );
}

export default App;
