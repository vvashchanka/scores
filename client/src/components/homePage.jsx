import React from 'react';
import { Link } from 'react-router-dom';
import login from "./img/login.png";
import signup from "./img/signup.png";
import UserPage from './userPage';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import {api} from '../config';

export default class App extends React.Component {
    state = {
        loggedOut: false,
        games: []
    };

    getGames = () => {
        axios.get(`${api}games`)
            .then(res => {
                this.setState({
                    games: res.data
                })
            })
            .catch(err => {
                console.log(err)
            });
    };

    componentWillMount() {
        this.getGames()
    }

    logOutRedirect = () => {
        this.setState({
            loggedOut: true
        })
    };
    render() {

        const columns = [{
            Header: 'Team 1',
            accessor: 'team1'
        }, {
            Header: 'Team 2',
            accessor: 'team2'
        }, {
            Header: 'Score1',
            accessor: 'score1'
        }, {
            Header: 'Score2',
            accessor: 'score2'
        }, {
            Header: 'Date',
            accessor: 'createdAt'
        }];
        if(localStorage.jwt) {
        return <UserPage logged={this.logOutRedirect}/>
    } else {
        return <div className="container">
            <div className="note">
                <p>Welcome</p>
            </div>
            <div className="content">
<Link className="icon_signup" to='/register'>Sign up</Link>

<Link className="icon_login" to='/login'>Log in</Link>
                <ReactTable
                    minRows='3'
                    data={this.state.games}
                    columns={columns}
                />
                </div>

            </div>
    }
}}