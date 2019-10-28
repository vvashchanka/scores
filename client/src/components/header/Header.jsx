import styles from "../../newComponents/LoginPage/styleVer2.module.css";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {ReactComponent as Plus} from "../img/svg/plus-box.svg";
import {ReactComponent as Logout} from "../img/svg/logout.svg";
import Notification from "../notification/Notification";
import ApproveGames from "../modal/ApproveGames/ApproveGames";
import Modal from "react-bootstrap/Modal";
import ViewTeam from "../modal/ViewTeam/ViewTeam";

const Header = (props) => {
    console.log(props);
    const { gamesToConfirm, confirmGame, deleteGame, team, removeTeam, logo, captain, player } = props;

    const [modalViewTeam, setModalViewTeam] = useState(false)
    const [modalApprove, setModalApprove] = useState(false);
    const [toggle, setToggle] = useState(false);

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
    }
    if(props.state.data.isCaptain) {
        return (
            <div className={styles.header}>
                <Container>
                    <div className={styles.headerBox}>
                        <NavLink to='/'><div className={styles.godel}>Godel<span
                            className={styles.football}>Football</span></div></NavLink>
                        <div className={styles.navButtons}>
                            <Notification/>

                            <Modal show={modalViewTeam} onHide={() => setModalViewTeam(false)}>
                                <ViewTeam team={team}
                                          removeTeam={removeTeam}
                                          logo={logo}
                                          player={player}
                                          captain={captain}
                                />
                            </Modal>

                            <Modal show={modalApprove} onHide={() => setModalApprove(false)}>
                                <ApproveGames gamesToConfirm={gamesToConfirm}
                                              confirmGame={confirmGame} deleteGame={deleteGame}/>
                            </Modal>
                            <div className={styles.btnUserActionsWrapper}>

                                <button onClick={() => {setToggle(!toggle)
                                }} className={styles.userNameBtn}>
                                    {props.state.data.login}
                                </button>
                                {toggle && <div className={styles.toggleDiv}>
                                    <ul className={styles.navList}>
                                        <li className={styles.navItem}>Invite Player</li>
                                        <li className={styles.navItem}>Create Game</li>
                                        <li onClick={() => setModalApprove(!modalApprove)} className={styles.navItem}>Approve Games</li>
                                        <li onClick={() => setModalViewTeam(!modalViewTeam)} className={styles.navItem}>View Team</li>
                                    </ul>
                                </div>}

                                <NavLink to='/login'><button className={styles.btnLogout}><Logout className={styles.btnLogoutIcon}/></button></NavLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>)
    }

    if(!props.state.data.isCaptain) {
        return (
            <div className={styles.header}>
                <Container>
                    <div className={styles.headerBox}>
                        <NavLink to='/'><div className={styles.godel}>Godel<span
                            className={styles.football}>Football</span></div></NavLink>
                        <div className={styles.navButtons}>
                            <Notification/>
                            {!props.state.data.teamName &&<div>
                                <button onClick={() => {
                                }} className={styles.navBarCreate}>
                                    <span className={styles.btnCreateWrapper}><Plus className={styles.plusImg}/><span
                                        className={styles.btnCreateText}>Create Team</span></span>
                                </button>
                            </div>}

                            <div className={styles.btnUserActionsWrapper}>
                                <button onClick={() => {setToggle(!toggle)
                                }} className={styles.userNameBtn}>
                                    {props.state.data.userName}
                                </button>
                                {toggle && <div className={styles.toggleDiv}>
                                    <ul className={styles.navList}>
                                        <li className={styles.navItem}>Invite Player</li>
                                        <li className={styles.navItem}>Create Game</li>
                                        <li className={styles.navItem}>Approve Games</li>
                                        <li className={styles.navItem}>View Team</li>
                                    </ul>
                                </div>}
                                <NavLink to='/login'><button className={styles.btnLogout}><Logout className={styles.btnLogoutIcon}/></button></NavLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>)
    }
};
export default Header