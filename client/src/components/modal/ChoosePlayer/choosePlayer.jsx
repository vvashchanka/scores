import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../CreateTeam/test.module.css';

const ChoosePlayer = (props) => {

    return (
        <Modal.Dialog {...props}
                      size="s"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered>
            <Modal.Header closeButton centered>
                <h1>Choose player</h1>
            </Modal.Header>
            <Modal.Body closeButton>
                <div className={styles}>
                    <input className={styles.inputSearch} placeholder={'Search...'}/>
                    <button className={styles.buttonCreate}>Submit</button>
                </div>
            </Modal.Body>
        </Modal.Dialog>
    );

};

export default ChoosePlayer;