import React from 'react';
import ErrorMsg from "./infoMsg";
import {Link} from 'react-router-dom';
import history from '../history';
import {api} from '../config';

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
            .then(res => {
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

    nameValue = (e) => {
        this.setState({
            name: e.target.value
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

    confirmedPass = (e) => {
        this.setState({
            confirmedPassword: e.target.value
        })
    };

    redir = () => {
        setTimeout(() => {
            history.push('/login')
        }, 1500);
    };

    render() {
        if (this.state.success) {
            this.redir()
        }
        return (
                <div className="container">
                    <form className="form" onSubmit={(e) => {
                        e.preventDefault();
                        this.sendData({
                            name: this.state.name,
                            login: this.state.login,
                            password: this.state.password,
                            confirmedPassword: this.state.confirmedPassword
                        })
                    }}>
                        <div className="note">
                            <p>Register</p>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your Name *"
                                               onChange={(e) => this.nameValue(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your Login *"
                                               onChange={(e) => this.loginValue(e)}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Your Password *"
                                               onChange={(e) => this.passwordValue(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Confirm Password *"
                                               onChange={(e) => this.confirmedPass(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button disabled={this.state.disabled} className="btn btn-outline-secondary mr-2">Sign up
                            </button>
                            <Link to='/'>Home</Link>
                            <ErrorMsg ok={this.state.ok} msg={this.state.msg}/>
                        </div>
                    </form>
                </div>
        )
    }
}
