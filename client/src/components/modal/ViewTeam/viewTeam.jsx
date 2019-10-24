import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../CreateTeam/test.module.css';
import {ReactComponent as Minus} from "../../../svg/minus-box-outline.svg";

const ViewTeam = () => {

    return (
        <Modal.Dialog>
            <Modal.Header closeButton centered>
                <h1>Ольга Валентиновна</h1>
            </Modal.Header>
            <Modal.Body closeButton>
                <div className={styles.textCenter}>
                    <h3>Captain: Alex Orlov</h3>
                    <div className={styles.player}>
                        <h3>Player: Pussy killer</h3>
                        <Minus className={styles.minus}/>
                    </div>
                    <button className={styles.buttonDelete}>DELETE TEAM</button>
                </div>
            </Modal.Body>
        </Modal.Dialog>
    );

};

export default ViewTeam;