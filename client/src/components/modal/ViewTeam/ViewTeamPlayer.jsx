import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../CreateTeam/test.module.css';


const ViewTeam = (props) => {
    const {teamName, approvedPlayer, leaveTeam, myCaptain} = props;
    return (
        <>
            <Modal.Header closeButton>
                <h1 className={styles.teamName}>{teamName}</h1>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.modalBody}>
                    Captain: {myCaptain}
                    {approvedPlayer}
                    {leaveTeam}
                </div>
            </Modal.Body>
        </>
    )
};

export default ViewTeam;
