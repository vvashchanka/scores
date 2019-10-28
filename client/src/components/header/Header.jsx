import styles from "../../newComponents/LoginPage/styleVer2.module.css";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {ReactComponent as Plus} from "../img/svg/plus-box.svg";
import {ReactComponent as Logout} from "../img/svg/logout.svg";
import Notification from "../notification/Notification";

const Header = (props) => {
    const [toggle, setToggle] = useState(false)
    const logOut = () => {
        localStorage.removeItem('jwt');
    };
    let loggedIn;
    if (props.state) {
        loggedIn = props.state.loggedIn;
    }
    if (!loggedIn) {
        return (
            <div className={styles.header}>
                <Container>
                    <Row>
                        <NavLink to='/'><Col className={styles.godel}>Godel<span
                            className={styles.football}>Football</span></Col></NavLink>
                        <Col className={styles.navButtons}>
                            <NavLink to='/register'>
                                <button type="button" className={styles.navBarRegister}>Register</button>
                            </NavLink>
                            <NavLink to='/login'>
                                <button type="button" className={styles.navBarLogin}>Login</button>
                            </NavLink>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    } else {
        return (
            <div className={styles.header}>
                <Container>
                    <Row>
                        <NavLink to='/'><Col className={styles.godel}>Godel<span
                            className={styles.football}>Football</span></Col></NavLink>
                        <div className={styles.navButtons}>
                            <Notification/>
                            <div className={styles.btnCreateTeamWrapper}>
                                <button onClick={() => {
                                }} className={styles.navBarCreate}>
                                    <span className={styles.btnCreateWrapper}><Plus className={styles.plusImg}/><span
                                        className={styles.btnCreateText}>Create Team</span></span>
                                </button>
                            </div>

                            <div className={styles.btnUserActionsWrapper}>

                                        <button onBlur={() => {setToggle(!toggle)
                                        }}onClick={() => {setToggle(!toggle)
                                        }} className={styles.userNameBtn}>
                                            UserName
                                        </button>
                                {toggle && <div className={styles.toggleDiv}>
                                    <ul className={styles.navList}>
                                        <li className={styles.navItem}>Invite Player</li>
                                        <li className={styles.navItem}>Create Game</li>
                                        <li className={styles.navItem}>Approve Games</li>
                                        <li className={styles.navItem}>View Team</li>
                                    </ul>
                                </div>}
                                <button className={styles.btnLogout}><Logout className={styles.btnLogoutIcon}/></button>
                            </div>

                            {/*<NavLink to='/login'><button type="button" onClick={() => {logOut()}} className={styles.navBarLogin}>Log out</button></NavLink>*/}
                        </div>
                    </Row>
                </Container>
            </div>)
    }
};
export default Header