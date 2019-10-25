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
        msg: '',
        success: false,
        ok: false,
        disabled: false,
        hasError: false,
        connectionError: '',
        isLoading: false
    };

    sendData = (data) => {
        axios.post(`${api}register`, {
            name: data.name,
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

    nameValue = (value) => {
        this.setState({
            name: value
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
