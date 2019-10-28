import React from "react";
import {ReactComponent as Approve} from "../../../img/svg/approve.svg";
import {ReactComponent as Decline} from "../../../img/svg/decline.svg";
import styles from "./gameItem.module.css"

const GameItem = (props) => {
    const { id, team1, team2, score1, score2, confirm, decline} = props;

    return (
        <div className={styles.gameBox}>
            <div className={styles.game__item}>{team1}</div>
            <div className={styles.game__item}>
                <span className={styles.game__scoreItem}>{score1}</span>
                <span className={styles.game__scoreItem}>:</span>
                <span className={styles.game__scoreItem}>{score2}</span>
            </div>
            <div className={styles.game__item}>{team2}</div>
            <div className={styles.game__item}>
                <Approve className={styles.game__buttonSuccess} onClick={() => confirm(id)}/>
                <Decline className={styles.game__buttonDelete} onClick={() => decline(id)}/>
            </div>
        </div>
    )
};

export default GameItem;