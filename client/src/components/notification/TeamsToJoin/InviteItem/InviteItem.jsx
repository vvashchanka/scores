import React from "react";
import {ReactComponent as Approve} from "../../../img/svg/approve.svg";
import {ReactComponent as Decline} from "../../../img/svg/decline.svg";
import styles from "./gameItem.module.css"

const InviteItem = (props) => {
    const { teamName, accept, refuse } = props;

    return (
        <div className={styles.gameBox}>
            <div className={styles.game__item}>{teamName}</div>
            <div className={styles.game__item}>
                <Approve className={styles.game__buttonSuccess} onClick={() => accept(teamName)}/>
                <Decline className={styles.game__buttonDelete} onClick={() => refuse(teamName)}/>
            </div>
        </div>
    )
};

export default InviteItem;