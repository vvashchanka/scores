import React from "react";
import {Modal} from "react-bootstrap";
import {ReactComponent as Approve} from "../../img/svg/approve.svg";
import {ReactComponent as Decline} from "../../img/svg/decline.svg";
import DatePicker from "react-datepicker";
import InfoMsg from "../../infoMsg";
import JoinItem from "./JoinItem/JoinItem";

const JoinTeam = (props) => {
    const { teamsToJoin, joinTeam } = props;

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Games for Approve</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {teamsToJoin.map(game => <JoinItem {...game} joinTeam={joinTeam}/>)}
            </Modal.Body>
        </>
    )
};

export default JoinTeam;


