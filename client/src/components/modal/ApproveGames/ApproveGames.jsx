import React from "react";
import {Modal} from "react-bootstrap";
import styles from "./approveGames.module.css";
import {ReactComponent as Approve} from "../../img/svg/approve.svg";
import {ReactComponent as Decline} from "../../img/svg/decline.svg";
import DatePicker from "react-datepicker";
import InfoMsg from "../../infoMsg";
import GameItem from "./GameItem/GameItem";

const ApproveGames = (props) => {
    const { gamesToConfirm, confirmGame, deleteGame } = props;

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Games for Approve</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {gamesToConfirm.map(game => <GameItem {...game} confirm={confirmGame} decline={deleteGame} />)}
            </Modal.Body>
        </>
    )
};

export default ApproveGames;


