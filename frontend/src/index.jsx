/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './Components/App/App';
import { Router, Route } from "@solidjs/router";
import Login from "./Components/Login/Login";
import Button from "./Components/Button/Button";
import UsersTours from "./Components/UsersTours/UsersTours";
import Client from './Components/Clients/Clients';
import ClientList from './Components/ClientsList/ClientsList';
import ModifyClient from './Components/ModifyClient/ModifyClient';

render(
    () =>
        <Router root={App}>
            <Route path = "/login" component = {Login}/>
            <Route path = "/:typicalTour/:driver/:date" component = {UsersTours}/>
            // change button to something else
            <Route path = "/" component = {Button}/>
            <Route path = "/addClient" component = {Client}/>
            <Route path = "/clients" component = {ClientList}/>
            <Route path="/modifyClient/:clientId" component={ModifyClient} />
        </Router>,
    document.getElementById("root")
);
