import styles from "../../newComponents/LoginPage/styleVer2.module.css";
import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    const logOut = () => {
            localStorage.removeItem('jwt');
    };
    let loggedIn;
    if(props.state) {
        loggedIn = props.state.loggedIn;
    }
if (!loggedIn){
    return (
        <div className={styles.header}>
            <Container>
                <Row>
                    <NavLink to='/'><Col className={styles.godel}>Godel<span className={styles.football}>Football</span></Col></NavLink>
                    <Col className={styles.navButtons}>
                        <NavLink to='/register'><button type="button" className={styles.navBarRegister}>Register</button></NavLink>
                        <NavLink to='/login'><button type="button" className={styles.navBarLogin}>Login</button></NavLink>
                    </Col>
                </Row>
            </Container>
        </div>
    )} else {
        return (
            <div className={styles.header}>
                <Container>
                    <Row>
                        <NavLink to='/'><Col className={styles.godel}>Godel<span className={styles.football}>Football</span></Col></NavLink>
                        <Col className={styles.navButtons}>
                            <NavLink to='/login'><button type="button" onClick={() => {logOut()}} className={styles.navBarLogin}>Log out</button></NavLink>
                        </Col>
                    </Row>
                </Container>
            </div>)
    }
};
export default Header