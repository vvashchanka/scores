import React from "react";
import {Modal} from "react-bootstrap";
import JoinItem from "./JoinItem/JoinItem";

const JoinTeam = (props) => {
    const { teamsToJoin, joinTeam } = props;

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Teams to Join</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {teamsToJoin ? teamsToJoin.map(game => <JoinItem {...game} joinTeam={joinTeam}/>) : null}
            </Modal.Body>
        </>
    )
};

export default JoinTeam;


