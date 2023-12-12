/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './Components/App/App';
import { Router, Route } from "@solidjs/router";
import Login from "./Components/Login/Login";
import TypicalTour from "./Components/TypicalTour/TypicalTour";
import DeliveryTour from "./Components/DeliveryTour/DeliveryTour";
import TourModification from "./Components/TourModification/TourModification";

render(
    () =>
        <Router root={App}>
            <Route path = "/login" component = {Login}/>
            <Route path = "/" component = {TypicalTour}/>
            <Route path = "/{idtournee}" component = {TourModification}/>
            <Route path = "/{idtournee}/{idlivreur}/{date}" component = {DeliveryTour}/>
        </Router>,
    document.getElementById("root")
);
