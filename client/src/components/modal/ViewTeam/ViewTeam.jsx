import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../CreateTeam/test.module.css';
import {ReactComponent as Minus} from "../../../svg/minus-box-outline.svg";

const ViewTeam = (props) => {
    const {team, removeTeam, logo, player, captain} = props;
    return (
        <>
            <Modal.Header closeButton centered>
                <img src={logo} alt="Team logo"/>
                <h1 className={styles.teamName}>{team}</h1>
            </Modal.Header>
            <Modal.Body centered>
                <div>
                    <p>Captain: {captain}</p>
                    {player}
                    <button className={styles.buttonDelete} onClick={removeTeam}>DELETE TEAM</button>
                </div>
            </Modal.Body>
        </>
    );

};

export default ViewTeam;
