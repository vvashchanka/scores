import React from 'react';
import CaptainView from './captainPage';
import PlayerView from './playerPage';
import jwt from "jsonwebtoken";
import axios from 'axios';
import {api} from '../config';

export default class UserPage extends React.Component {
    state = {
        data: {},
        team: '',
        loggedOut: false,
        msg: '',
        ok: '',
        myTeam: [],
        teams: [],
        teamsToJoin: [],
        teamsToAccept: [],
        gameAddTeam: '',
        score1: '',
        score2: '',
        isInTeam: '',
        captainApproved: '',
        playerApproved: '',
        chosenPlayer: '',
        freePlayers: [],
        hasInvites: false,
        gamesToConfirm: [],
        playerName: '',
        date: new Date()
    };

    componentWillMount() {
        this.getCaptain();
    }

    getCaptain = () => {
        console.log('checking user status');
        const login = jwt.decode(localStorage.jwt).login;

        axios.get(`${api}user`, {
            params: {
                login
            }
        })
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
            .catch(err => {
                console.log(err)
            });
    };


    render() {
        return this.state.data.isCaptain ?
            <CaptainView state={this.state} logged={this.props} captain={this.getCaptain}/>
            : <PlayerView state={this.state} logged={this.props} captain={this.getCaptain}/>
    }}

