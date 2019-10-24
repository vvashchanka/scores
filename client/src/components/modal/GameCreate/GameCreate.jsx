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
                    <div className={styles.form__group}><label className={styles.form__label} htmlFor="opponent">Choose the opponent</label><input
                        className={styles.form__input} id="opponent" type="text" required="required"
                        /*value={value} onChange={e => onValueChange(id, e.target.value)}*//>
                    </div>
                </div>
            </Modal.Body>
        </Modal.Dialog>
    )
};

export default GameCreate;