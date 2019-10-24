import React from 'react';
import setToken from '../setToken';
import ErrorMsg from "./infoMsg";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {api} from '../config';
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

    loginValue = (e) => {
        this.setState({
            login: e.target.value
        })
    };

    passwordValue = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    render() {
        if(this.state.loggedIn) {
            return (
                <Redirect to="/"/>
            )
        } else {
        return (
            <div className="container">
                <form className="form" onSubmit={(e) => {
                    e.preventDefault();
                    this.sendData({
                        login: this.state.login,
                        password: this.state.password
                    })
                }}>
                    <div className="note">
                        <p>Sign in</p>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Your Login *" onChange={(e) => this.loginValue(e)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Your Password *" onChange={(e) => this.passwordValue(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                        <button disabled={this.state.disabled} className="btn btn-outline-secondary mr-2" >Log in
                        </button>
                        <Link to='/'>Home</Link>
                        <ErrorMsg msg={this.state.msg}/>
                        </div>
                    </div>
                </form>
            </div>
        )}
    }
}

