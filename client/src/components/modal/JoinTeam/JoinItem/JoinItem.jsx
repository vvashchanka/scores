import React from "react";
import {ReactComponent as Approve} from "../../../img/svg/approve.svg";
import styles from "./joinItem.module.css"

const JoinItem = (props) => {
    const { teamName, image, joinTeam} = props;

    return (
        <div className={styles.gameBox}>
            <div className={styles.game__item}>
                <img className="avatar" src={image} alt="avatar"/>
            </div>
            <div className={styles.game__item}>{teamName}</div>
            <div className={styles.game__item}>
                <Approve className={styles.game__buttonSuccess} onClick={() => joinTeam(teamName)}/>
            </div>
        </div>
    )
};

export default JoinItem;