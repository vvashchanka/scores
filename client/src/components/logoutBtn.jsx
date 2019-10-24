import React from 'react';
import { Redirect } from 'react-router';

export default class LogoutBtn extends React.Component {
    render() {
    const {isHome} = this.props;
    const logout = () => {
        localStorage.removeItem('jwt');
        isHome.logged();
        return <Redirect to={'/login'}/>;
    };
    return <button className="btn btn-outline-secondary block logout" onClick={() => {logout()}}>Log out</button>
}}