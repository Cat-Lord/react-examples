import App from "./app/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import reduxStore from "./redux/createReduxStore";

const root = createRoot(document.getElementById('root')!);
root.render(
  <ReduxProvider store={reduxStore} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);