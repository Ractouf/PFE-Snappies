/* @refresh reload */
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';

import './index.css';
import App from './Components/App/App';
import Login from './Components/Login/Login';
import { Router, Route, Routes } from "@solidjs/router";
import Inventory from './Components/Inventory/Inventory';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const Main = () => {
  const [location, setLocation] = createSignal(window.location.pathname);

  const updateLocation = () => setLocation(window.location.pathname);

  window.addEventListener('popstate', updateLocation);

  return (
    <Router>
      <Routes>
        <Route path="/" componentt={App} />
        <Route path="/login" component={Login} />
        <Route path="/items" component={Inventory} />
      </Routes>
    </Router>
  );
};

render(() => <Main />, root);
