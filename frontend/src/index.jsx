/* @refresh reload */
import {render} from 'solid-js/web';
import './index.css';
import App from './Components/App/App';
import {Router, Route} from "@solidjs/router";
import Login from "./Components/Login/Login";
import TypicalTour from "./Components/TypicalTour/TypicalTour";
import TourModification from "./Components/TourModification/TourModification";


import UsersTours from "./Components/UsersTours/UsersTours";


render(
    () =>
        <Router root={App}>
            <Route path="/login" component={Login}/>
            <Route path="/" component={TypicalTour}/>
            <Route path="/:idtournee" component={TourModification}/>
            <Route path="/:typicalTour/:driver/:date" component={UsersTours}/>
        </Router>,
    document.getElementById("root")
);
