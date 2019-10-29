import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../CreateTeam/test.module.css';
import InfoMsg from "../../infoMsg";


const ViewTeam = (props) => {
    const {teamName, approvedPlayer, leaveTeam, myCaptain} = props;
    return (
        <>
            <Modal.Header closeButton>
                <h1 className={styles.teamName}>{teamName}</h1>
            </Modal.Header>
            <Modal.Body>
                Captain: {myCaptain}
                <div className={styles.modalBody}>
                    {approvedPlayer}
                    {leaveTeam}
                </div>
            </Modal.Body>
        </>
    )
};

export default ViewTeam;
