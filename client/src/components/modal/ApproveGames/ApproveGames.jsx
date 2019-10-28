import React from "react";
import {Modal} from "react-bootstrap";
import styles from "./approveGames.module.css";
import {ReactComponent as Approve} from "../../img/svg/approve.svg";
import {ReactComponent as Decline} from "../../img/svg/decline.svg";
import DatePicker from "react-datepicker";
import InfoMsg from "../../infoMsg";
import GameItem from "./GameItem/GameItem";

const ApproveGames = (props) => {
    let { gamesToConfirm, confirmGame, deleteGame } = props;
    gamesToConfirm = [{
        id: '2',
        score1: '11',
        score2: '12',
        team1: '12345',
        team2: 'test11'}];
    return (
        <Modal.Dialog
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title>Games for Approve</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {gamesToConfirm.map(game => <GameItem {...game} confirm={confirmGame} decline={deleteGame} />)}
            </Modal.Body>
        </Modal.Dialog>
    )
};

export default ApproveGames;


