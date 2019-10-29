import React from "react";
import {Modal} from "react-bootstrap";
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


