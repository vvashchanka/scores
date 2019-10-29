import Header from "./components/header/Header";
import {Route, Router, Switch} from "react-router";
import history from "./history";
import ApproveGames from "./components/modal/ApproveGames/ApproveGames";
import GameCreate from "./components/modal/GameCreate/GameCreate";
import Notification from "./components/notification/Notification";
import Login from "./components/loginPage";
import Register from "./components/registerPage";
import CreateTeam from "./components/modal/CreateTeam/createTeam";
import ViewTeam from "./components/modal/ViewTeam/viewTeam";
import InvitePlayer from "./components/modal/InvitePlayer/ChoosePlayer";
import Home from "./components/homePage";
import React from "react";


class App extends React.Component {
    state = {};

    render() {
        return <>
            <Header/>
            <Router history={history}>
                <Switch>
                    <Route path="/modal">
                        <div>
                            <ApproveGames/>
                            <GameCreate/>
                            <Notification/>
                        </div>

                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/test1">
                        <CreateTeam/>
                        <ViewTeam/>
                        <InvitePlayer/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router></>
    }
}

export default App;