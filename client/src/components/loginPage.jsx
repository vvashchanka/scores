import React from 'react';
import setToken from '../setToken';
import {api} from '../config';
import LoginPageVer2 from "../newComponents/LoginPage/LoginPageVer2";
const axios = require('axios');

export default class Login extends React.Component {
    state = {
        login: '',
        password: '',
        msg: '',
        loggedIn: false,
        disabled: false
    };

    sendData = (data) => {
        const userData = {
            login: data.login,
            password: data.password
        };
        axios.post(`${api}login`, userData
        )
            .then(response => {
                const token = response.headers.authtoken;
                localStorage.setItem('jwt', token);
                setToken(token);
                this.setState({
                    disabled: true,
                    loggedIn: true
                });
            })
            .catch(err => {
                const error = err.response ? err.response.data : 'Network Error';
                this.setState({
                    msg: error
                })
            })
    };

    loginValue = (value) => {
        this.setState({
            login: value
        })
    };

    passwordValue = (value) => {
        this.setState({
            password: value
        })
    };

    render() {
        return (
            <>
                <LoginPageVer2
                    data={this.state}
                    sendData={this.sendData}
                    loginValue={this.loginValue}
                    passwordValue={this.passwordValue}
                    login={this.state.login}
                    password={this.state.password}
                />
            </>

        )
    }
}

