/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './Components/App/App';
import { Router, Route } from "@solidjs/router";
import Login from "./Components/Login/Login";
import Button from "./Components/Button/Button";
import UsersTours from "./Components/UsersTours/UsersTours";

render(
    () =>
        <Router root={App}>
            <Route path = "/login" component = {Login}/>
            <Route path = "/:typicalTour/:driver/:date" component = {UsersTours}/>
            // change button to something else
            <Route path = "/" component = {Button}/>
        </Router>,
    document.getElementById("root")
);
