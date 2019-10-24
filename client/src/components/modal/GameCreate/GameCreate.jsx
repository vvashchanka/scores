import React from "react";
import {Modal} from "react-bootstrap";
import styles from "./gameCreate.module.css";

const GameCreate = (props) => {
    return (
        <Modal.Dialog
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Create New Game</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className={styles.gameBox}>
                    <div className={styles.game__item}>ОльгаВалентиновна</div>
                    <div className={styles.game__item}>
                        <span className={styles.game__scoreItem}>3</span>
                        <span className={styles.game__scoreItem}>:</span>
                        <span className={styles.game__scoreItem}>2</span>
                    </div>
                    <div className={styles.game__item}>Star Wars</div>
                    <div className={styles.game__item}>
                        <Approve className={styles.game__buttonSuccess}/>
                        <Decline className={styles.game__buttonDelete}/>
                    </div>
                </div>
            </Modal.Body>
        </Modal.Dialog>
    )
};

export default GameCreate;