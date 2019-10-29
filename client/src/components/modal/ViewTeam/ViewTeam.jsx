import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../CreateTeam/test.module.css';
import InfoMsg from "../../infoMsg";


const ViewTeam = (props) => {
    const {team, removeTeam, logo, player, captain, ok, msg} = props;

        return (
        <>
            <Modal.Header closeButton>
                <img src={logo} alt="Team logo"/>
                <h1 className={styles.teamName}>{team}</h1>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.modalBody}>
                    <p>Captain: {captain}</p>
                    {player}
                    <button className={styles.buttonDelete} onClick={removeTeam}>DELETE TEAM</button>
                </div>
                <InfoMsg ok={ok} msg={msg}/>
            </Modal.Body>
        </>
        )
};

export default ViewTeam;
