import styles from "../../newComponents/LoginPage/styleVer2.module.css";
import {Col, Container, Row} from "react-bootstrap";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {ReactComponent as Plus} from "../img/svg/plus-box.svg";
import {ReactComponent as Logout} from "../img/svg/logout.svg";
import Notification from "../notification/Notification";
import ApproveGames from "../modal/ApproveGames/ApproveGames";
import Modal from "react-bootstrap/Modal";
import ViewTeam from "../modal/ViewTeam/ViewTeam";
import GameCreate from "../modal/GameCreate/GameCreate";
import CreateTeam from "../modal/CreateTeam/createTeam";
import JoinTeam from "../modal/JoinTeam/JoinTeam";
import InvitePlayer from "../modal/InvitePlayer/InvitePlayer";
import ViewTeamPlayer from "../modal/ViewTeam/ViewTeamPlayer";

const Header = (props) => {
    const {
        gamesToConfirm,
        confirmGame,
        deleteGame,
        team,
        removeTeam,
        logo,
        captain,
        player,
        game,
        teams,
        score1,
        score2,
        date,
        msg,
        selectTeam,
        setDate,
        setScore1,
        setScore2,
        createGame,
        ok,
        createTeam,
        teamsToJoin,
        joinTeam,
        freePlayers,
        sendInvite,
        reset,
        declineTeam,
        acceptTeam,
        teamName,
        leaveTeam,
        approvedPlayer,
        playerConfirm,
        myCaptain
    } = props;

    const [modalCreateGame, setModalCreateGame] = useState(false);
    const [modalViewTeam, setModalViewTeam] = useState(false);
    const [modalApprove, setModalApprove] = useState(false);
    const [modalCreateTeam, setModalCreateTeam] = useState(false);
    const [modalJoinTeam, setModalJoinTeam] = useState(false);
    const [toggleDropDown, setToggleDropDown] = useState(false);
    const [modalInvitePlayer, setModalInvitePlayer] = useState(false);
    const [modalViewTeamPlayer, setModalViewTeamPlayer] = useState(false);

    const ModalViewTeam = () => <Modal show={modalViewTeam} onHide={() => setModalViewTeam(false)}>
        <ViewTeam team={team}
                  removeTeam={removeTeam}
                  logo={logo}
                  player={player}
                  captain={captain}
        />
    </Modal>;


    const ModalInvitePlayer = () => <Modal show={modalInvitePlayer} onHide={() => {
        setModalInvitePlayer(false);
        reset();
    }}>
        <InvitePlayer team={team}
                      removeTeam={removeTeam}
                      logo={logo}
                      player={player}
                      captain={captain}
                      ok={ok} msg={msg}
                      sendInvite = {sendInvite}
                      freePlayers = {freePlayers}

        />
    </Modal>;

    const ModalApproveGames = () => <Modal show={modalApprove} onHide={() => setModalApprove(false)}>
        <ApproveGames gamesToConfirm={gamesToConfirm}
                      confirmGame={confirmGame} deleteGame={deleteGame}/>
    </Modal>;

    const ModalCreateGame = () => <Modal show={modalCreateGame} onHide={() => setModalCreateGame(false)}>
        <GameCreate game={game} teams={teams} score1={score1} score2={score2}
                    date={date} ok={ok} msg={msg} selectTeam={selectTeam}
                    setDate={setDate} setScore1={setScore1}
                    setScore2={setScore2} createGame={createGame}
        />
    </Modal>;

    const ModalViewTeamPlayer = () => <Modal show={modalViewTeamPlayer} onHide={() => setModalViewTeamPlayer(false)}>
        <ViewTeamPlayer teamName={teamName}
                        approvedPlayer={approvedPlayer}
                        leaveTeam={leaveTeam}
                        myCaptain={myCaptain}
        />
    </Modal>;

    const ModalCreateTeam = () => <Modal show={modalCreateTeam} onHide={() => setModalCreateTeam(false)}>
        <CreateTeam ok={ok} msg={msg} team={createTeam}/>
    </Modal>;
    const ModalJoinTeam = () => (
        <Modal
            show={modalJoinTeam}
            onHide={() => setModalJoinTeam(false)}
        >
            <JoinTeam
                teamsToJoin={teamsToJoin}
                joinTeam={joinTeam}
            />
        </Modal>
    );

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
                        <NavLink className={styles.labelLink} to='/'><Col className={styles.godel}>Godel<span
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
    if (props.state.data.isCaptain) {
        return (
            <div className={styles.header}>
                <Container>
                    <div className={styles.headerBox}>
                        <NavLink className={styles.labelLink} to='/'>
                            <div className={styles.godel}>Godel<span
                                className={styles.football}>Football</span></div>
                        </NavLink>
                        <div className={styles.navButtons}>
                            {!props.state.myTeam.captainApproved && props.state.myTeam.player && <Notification player={playerConfirm}/>}
                            <ModalViewTeam/>
                            <ModalApproveGames/>
                            <ModalCreateGame/>
                            <ModalInvitePlayer/>
                            <div className={styles.btnUserActionsWrapper}>

                                <button onClick={() => {
                                    setToggleDropDown(!toggleDropDown)
                                }} className={styles.userNameBtn}>
                                    {props.state.data.login}
                                </button>
                                {toggleDropDown && <div className={styles.toggleDiv}>
                                    <ul className={styles.navList}>
                                        <li onClick={() => setModalInvitePlayer(!modalInvitePlayer)}
                                            className={styles.navItem}>Invite Player
                                        </li>
                                        <li onClick={() => setModalCreateGame(!modalCreateGame)}
                                            className={styles.navItem}>Create Game
                                        </li>
                                        <li onClick={() => setModalApprove(!modalApprove)}
                                            className={styles.navItem}>Approve Games
                                        </li>
                                        <li onClick={() => setModalViewTeam(!modalViewTeam)}
                                            className={styles.navItem}>View Team
                                        </li>
                                    </ul>
                                </div>}

                                <NavLink to='/login'>
                                    <button className={styles.btnLogout} onClick={logOut}><Logout
                                        className={styles.btnLogoutIcon}/></button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>)
    }

    if (!props.state.data.isCaptain) {
        return (
            <div className={styles.header}>
                <Container>
                    <div className={styles.headerBox}>
                        <NavLink to='/' className={styles.labelLink}>
                            <div className={styles.godel}>Godel<span
                                className={styles.football}>Football</span></div>
                        </NavLink>
                        <div className={styles.navButtons}>
                            {props.state.hasInvites && <Notification
                                teamsToJoin={props.state.teamsToAccept}
                                accept={acceptTeam}
                                refuse={declineTeam}
                            />}
                            <ModalCreateTeam/>
                            {!props.state.isInTeam && <ModalJoinTeam/>}
                            <ModalViewTeamPlayer/>
                            {!props.state.data.teamName && <div>
                                <button onClick={() => {
                                    setModalCreateTeam(!modalCreateTeam)
                                }} className={styles.navBarCreate}>
                                    <span className={styles.btnCreateWrapper}><Plus className={styles.plusImg}/><span
                                        className={styles.btnCreateText}>Create Team</span></span>
                                </button>
                            </div>}

                            <div className={styles.btnUserActionsWrapper}>
                                <button onClick={() => {
                                    setToggleDropDown(!toggleDropDown)
                                }} className={styles.userNameBtn}>
                                    {props.state.data.userName}
                                </button>
                                {toggleDropDown && <div className={styles.toggleDiv}>
                                    <ul className={styles.navList}>
                                        {!props.state.data.teamName && <li className={styles.navItem} onClick={() => setModalJoinTeam(!modalJoinTeam)}>Join Team</li>}
                                        <li className={styles.navItem} onClick={() => setModalViewTeamPlayer(!modalViewTeamPlayer)}>ViewTeam</li>
                                    </ul>
                                </div>}
                                <NavLink to='/login'>
                                    <button className={styles.btnLogout} onClick={logOut}><Logout
                                        className={styles.btnLogoutIcon}/></button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>)
    }
};
export default Header