import React from "react";
import {Modal, Dropdown} from "react-bootstrap";
import styles from "./gameCreate.module.css";
import Input from "../Input/Input";

const GameCreate = (props) => {

    const {opponent, score1, score2, datePick} = props;
    return (
        <Modal.Dialog
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Create New Game</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Choose the opponent
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Team</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className={styles.form__group}><label className={styles.form__label}
                                                           htmlFor="Enter the score">Enter the score</label>
                    <input
                        className={styles.form__input} id="Enter the score" type="text" required="required"
                        value={score1}/>
                    <span className={styles.scoreItem}>:</span>
                    <input
                        className={styles.form__input} id="Enter the score2" type="text" required="required"
                        value={score2}/>
                </div>
                <button className={styles.buttonCreate}>CREATE</button>
            </Modal.Body>
        </Modal.Dialog>
    )
};

export default GameCreate;