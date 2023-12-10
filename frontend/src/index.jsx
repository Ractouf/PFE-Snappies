/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './Components/App/App';
import { Router, Route } from "@solidjs/router";
import Login from "./Components/Login/Login";
import TypicalTour from "./Components/TypicalTour/TypicalTour";
import CourierRegister from "./Components/CourierRegister/CourierRegister";

render(
    () =>
        <Router root={App}>
            <Route path = "/login" component = {Login}/>
            <Route path = "/" component = {TypicalTour}/>
            <Route path = "/registerCourier" component = {CourierRegister}/>
        </Router>,
    document.getElementById("root")
);
