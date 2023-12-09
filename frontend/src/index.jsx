/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './Components/App/App';
import { Router, Route } from "@solidjs/router";
import Login from "./Components/Login/Login";
import TypicalTour from "./Components/TypicalTour/TypicalTour";

render(
    () =>
        <Router root={App}>
            <Route path = "/login" component = {Login}/>
            <Route path = "/" component = {TypicalTour}/>
        </Router>,
    document.getElementById("root")
);
