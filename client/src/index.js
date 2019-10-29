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
import ApproveGames from "./components/modal/ApproveGames/ApproveGames";
import './index.css';
import GameCreate from "./components/modal/GameCreate/GameCreate";
import CreateTeam from "./components/modal/CreateTeam/createTeam";
import ViewTeam from "./components/modal/ViewTeam/ViewTeam";
import InvitePlayer from "./components/modal/InvitePlayer/InvitePlayer";


//Add token to every request header
setToken(localStorage.jwt);

ReactDOM.render(
    <>
        <Router history={history}>
            <Switch>
                <Route path="/modal">
                    <div>
                        <ApproveGames />
                        <GameCreate />
                    </div>

                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/test1">
                    <CreateTeam/>
                    <ViewTeam/>
                    <InvitePlayer/>
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router></>
    , document.getElementById('root'));

