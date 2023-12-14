/* @refresh reload */
import {render} from 'solid-js/web';
import './index.css';
import App from './Components/App/App';
import {Router, Route} from "@solidjs/router";
import Login from "./Components/Login/Login";
import TypicalTour from "./Components/TypicalTour/TypicalTour";
import UsersTours from "./Components/UsersTours/UsersTours";
import Articles from "./Components/Articles/Articles";


render(
    () =>
        <Router root={App}>
            <Route path="/login" component={Login}/>
            <Route path="/" component={TypicalTour}/>
            <Route path="/tours/:tourId" component ={UsersTours}/>
            <Route path="/articles" component ={Articles}/>
        </Router>,
    document.getElementById("root")
);
