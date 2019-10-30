import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import styles from "./gameCreate.module.css";
import DatePicker from "react-datepicker";
import InfoMsg from "../../infoMsg";

const GameCreate = (props) => {
    const [team, setTeam] = useState('');
    const [score1, setScore1] = useState('');
    const [score2, setScore2] = useState('');
    const [date, setDate] = useState(new Date());
    const {teams, ok, msg, createGame} = props;
    let gameTeam = '';
    const sendGame = () => {
        const teamName = team || gameTeam;
       createGame(teamName, score1, score2, date)
    };
   console.log(date);
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create New Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.modalWrapper}>
                    <div>
                        Select opponent team: <br/>
                        <select className={styles.opponentSelect} onChange={e => setTeam(e.target.value)}>{
                        teams.map((option, i) => {
                            if(!i) {
                                gameTeam = option.teamName;
                            }
                            return <option key={i}>{option.teamName}</option>})
                    }</select>
                    </div>
                    <div className={styles.form__group}><label className={styles.form__label}
                                                               htmlFor="Enter the score">Enter the score</label>
                        <input
                            className={styles.form__input} id="Enter the score" type="text" required="required"
                            placeholder="You" onChange={e => setScore1(e.target.value)}
                            value={score1}/>
                        <span className={styles.scoreItem}>:</span>
                        <input
                            className={styles.form__input} id="Enter the score2" type="text" required="required"
                            placeholder="Opp" onChange={e => setScore2(e.target.value)}
                            value={score2}/>
                    </div>
                    <div>
                        <h3 className={styles.selectDate}>Select date</h3>
                        <DatePicker className={styles.dateInput} onChange={date => setDate(date)}
                                    selected={date}/>
                        <div className={styles.date}>Date: {date ? date.toString().slice(0, -41) : 'Select a date'}</div>
                    </div>
                    <button className={styles.buttonCreate} disabled={!!ok} onClick={sendGame}>CREATE</button>

                    <InfoMsg ok={ok} msg={msg}/>
                </div>
            </Modal.Body>
        </>
    );
};

export default GameCreate;
