import React from 'react';
import {api} from '../config';
import RegisterPageVer2 from "../newComponents/RegisterPage/RegisterPageVer2";
import {Redirect} from "react-router";

const axios = require('axios');

export default class Register extends React.Component {
    state = {
        name: '',
        login: '',
        password: '',
        confirmedPassword: '',
        msg: ' ',
        success: false,
        ok: false,
        disabled: false,
        hasError: false,
        connectionError: '',
        isLoading: false
    };
//Send new user`s data
    sendData = (data) => {
        axios.post(`${api}register`, {
            userName: data.name,
            login: data.login,
            password: data.password,
            confirmedPassword: data.confirmedPassword
        })
            .then(() => {
                this.setState({
                    success: true,
                    ok: 'Registration successful, redirecting',
                    disabled: true,
                    msg: ''
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    msg: err.response.data
                });
            })
    };
//Handle user name input
    nameValue = (value) => {
        this.setState({
            name: value
        })
    };
//Handle user login input
    loginValue = (value) => {
        this.setState({
            login: value
        })
    };
//Handle user password input
    passwordValue = (value) => {
        this.setState({
            password: value
        })
    };
//Handle user confirm password input
    confirmedPass = (value) => {
        this.setState({
            confirmedPassword: value
        })
    };

    render() {
        return (
            <>
                {this.state.success && <Redirect to="/login"/>}
                <RegisterPageVer2
                    data={this.state}
                    sendData={this.sendData}
                    loginValue={this.loginValue}
                    passwordValue={this.passwordValue}
                    confirmPasswordValue={this.confirmedPass}
                    userNameValue={this.nameValue}
                    login={this.state.login}
                    password={this.state.password}
                    userName={this.state.name}
                    confirmPassword={this.state.confirmedPassword}
                    redirect={this.redirect}
                />
            </>
        )
    }
}
