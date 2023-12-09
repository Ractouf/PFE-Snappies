/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './Components/App/App';
import { Router, Route } from "@solidjs/router";
import Login from "./Components/Login/Login";
import Button from "./Components/Button/Button";

render(
    () =>
        <Router root={App}>
            <Route path = "/login" component = {Login}/>
            // change button to something else
            <Route path = "/" component = {Button}/>
        </Router>,
    document.getElementById("root")
);
