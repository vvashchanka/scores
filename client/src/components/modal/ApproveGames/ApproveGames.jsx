import React from "react";
import {Modal} from "react-bootstrap";
import styles from "./approveGames.module.css";
import {ReactComponent as Approve} from "../../img/svg/approve.svg";
import {ReactComponent as Decline} from "../../img/svg/decline.svg";
import DatePicker from "react-datepicker";
import InfoMsg from "../../infoMsg";

const ApproveGames = (props) => {
    return (
        <Modal.Dialog
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Games for Approve</Modal.Title>
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

export default ApproveGames;


