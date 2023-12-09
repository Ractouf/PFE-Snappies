/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './Components/App/App';
import Login from './Components/Login/Login';
import { Router, Route } from "@solidjs/router";
import Inventory from './Components/Inventory/Inventory';
import { createSignal } from 'solid-js';

const Root = () => {
  const [loggedIn, setLoggedIn] = createSignal(false);

  const checkLogin = () => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  };

  checkLogin();

  return (
    <Router>
      {loggedIn() ? (
        <>
          <Route path="/" component={App} />
          <Route path="/items" component={Inventory} />
        </>
      ) : (
        <>
          <Route path="/" component={Login} />
          <Route path="/items" component={Inventory} />
        </>
      )}
    </Router>
  );
};

render(() => Root(), document.getElementById("root"));
