import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './test.module.css';

const Test = (props) => {

    return (
        <Modal.Dialog {...props}
                      size="s"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered>
            <Modal.Header closeButton centered>
                <h1>Create Team</h1>
            </Modal.Header>
            <Modal.Body closeButton>
                <div className={styles.textCenter}>
                <input className={styles.inputTeam} placeholder={'Team Name'}/>
                <button className={styles.buttonCreate}>CREATE</button>
                </div>
            </Modal.Body>
        </Modal.Dialog>
    );

};

export default Test;