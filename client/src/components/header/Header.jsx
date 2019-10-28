import styles from "../../newComponents/LoginPage/styleVer2.module.css";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {ReactComponent as Plus} from "../img/svg/plus-box.svg";
import {ReactComponent as Logout} from "../img/svg/logout.svg";
import Notification from "../notification/Notification";
import ApproveGames from "../modal/ApproveGames/ApproveGames";
import Modal from "react-bootstrap/Modal";

const Header = (props) => {

    const { gamesToConfirm, confirmGame, deleteGame } = props;


    const [modalApprove, setModalApprove] = useState(false);
    const [toggle, setToggle] = useState(false);
    console.log(modalApprove);
    /*const ModalApproveGames = () => {

        return (
            <Modal show={modalApprove} onHide={setModalApprove(false)}>
                <ApproveGames gamesToConfirm={gamesToConfirm}
                              confirmGame={confirmGame} deleteGame={deleteGame}/>
            </Modal>
        )
    }*/


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
                    <Row>
                        <NavLink to='/'><Col className={styles.godel}>Godel<span
                            className={styles.football}>Football</span></Col></NavLink>
                        <div className={styles.navButtons}>
                            <Notification/>

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
                                        <li className={styles.navItem}>View Team</li>
                                    </ul>
                                </div>}

                                <NavLink to='/login'><button className={styles.btnLogout}><Logout className={styles.btnLogoutIcon}/></button></NavLink>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>)
    }

    if(!props.state.data.isCaptain) {
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

                                <button onClick={() => {setToggle(!toggle)
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
                                <NavLink to='/login'><button className={styles.btnLogout}><Logout className={styles.btnLogoutIcon}/></button></NavLink>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>)
    }
};
export default Header