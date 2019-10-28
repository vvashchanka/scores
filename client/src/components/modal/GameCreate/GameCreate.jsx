import React from "react";
import {Modal, Dropdown} from "react-bootstrap";
import styles from "./gameCreate.module.css";
import DatePicker from "react-datepicker";
import InfoMsg from "../../infoMsg";

const GameCreate = (props) => {

    const {game, teams, score1, score2, date, ok, msg, selectTeam, setDate, setScore1, setScore2, createGame} = props;
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create New Game</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className={styles.modalWrapper}>
                    <div>
                        Select opponent team: <br/>
                        <select onChange={e => selectTeam(e.target.value)}>{
                        teams.map((option, i) => {
                            if(!i) {
                                game(option.teamName)
                            }
                            return <option key={i}>{option.teamName}</option>})
                    }</select>
                    </div>
                    <div className={styles.form__group}><label className={styles.form__label}
                                                               htmlFor="Enter the score">Enter the score</label>
                        <input
                            className={styles.form__input} id="Enter the score" type="text" required="required"
                            placeholder="You" onChange={(e) => setScore1(e)}
                            value={score1}/>
                        <span className={styles.scoreItem}>:</span>
                        <input
                            className={styles.form__input} id="Enter the score2" type="text" required="required"
                            placeholder="Opp" onChange={(e) => setScore2(e)}
                            value={score2}/>
                    </div>
                    <div>
                        <h3>Select date</h3>
                        <DatePicker onChange={(date) => setDate(date)}
                                    selected={date}/>
                        <div>Date: {date ? date.toString().slice(0, -41) : 'Select a date'}</div>
                    </div>
                    <button className={styles.buttonCreate} disabled={!!ok} onClick={createGame}>CREATE</button>

                    <InfoMsg ok={ok} msg={msg}/>
                </div>
            </Modal.Body>
        </>
    );
};

export default GameCreate;
