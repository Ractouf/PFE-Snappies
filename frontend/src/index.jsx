/* @refresh reload */
import {render} from 'solid-js/web';
import './index.css';
import App from './Components/App/App';
import {Router, Route} from "@solidjs/router";
import Login from "./Components/Login/Login";
import TypicalTour from "./Components/TypicalTour/TypicalTour";
import UsersTours from "./Components/UsersTours/UsersTours";
import Articles from "./Components/Articles/Articles";
import Client from './Components/Clients/Clients';
import ClientList from './Components/ClientsList/ClientsList';
import ModifyClient from './Components/ModifyClient/ModifyClient';
import Boxes from "./Components/Boxes/Boxes";
import UserRegister from "./Components/UserRegister/UserRegister";
import DriverTours from "./Components/DriverTours/DriverTours";
import Users from "./Components/Users/Users";
import ModifyUser from "./Components/Users/ModifyUser";
import TypicalTours from "./Components/TypicalToursAdmin/TypicalTours";

render(
    () =>
        <Router root={App}>
            <Route path="/" component={TypicalTour}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/tours/:tourId" component = {UsersTours}/>
            <Route path = "/articles" component = {Articles}/>
            <Route path = "/tours/:driver/:date" component = {DriverTours}/>
            <Route path = "/addClient" component = {Client}/>
            <Route path = "/clients" component = {ClientList}/>
            <Route path="/modifyClient/:clientId" component={ModifyClient} />
            <Route path = "/boxes" component = {Boxes}/>
            <Route path = "/users" component = {Users}/>
            <Route path = "/registerUser" component = {UserRegister}/>
            <Route path = "/users/:id" component = {ModifyUser}/>
            <Route path = "/admin/tours/:id" component = {TypicalTours}/>
        </Router>,
    document.getElementById("root")
);
