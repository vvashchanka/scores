import React from 'react';
import ReactDOM from 'react-dom';
import setToken from './setToken';
import Login from './components/loginPage';
import Register from './components/registerPage';
import Home from './components/homePage';
import history from './history'
import {
    Router,
    Switch,
    Route
} from "react-router-dom";

setToken(localStorage.jwt);

ReactDOM.render(
    <Router history={history}>
    <Switch>
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
        <Route path="/">
            <Home />
        </Route>
    </Switch>
</Router>, document.getElementById('root'));

