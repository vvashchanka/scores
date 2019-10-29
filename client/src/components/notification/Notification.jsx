import React from "react";
import {Popover, OverlayTrigger, Button} from "react-bootstrap";
import {ReactComponent as Bell} from "../img/svg/bell.svg";
import styles from "./notification.module.css"
import InviteItem from "./TeamsToJoin/InviteItem/InviteItem";

const Notification = (props) => {
    console.log(props);
    const {teamsToJoin, accept, refuse, player} = props;
    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h2">{teamsToJoin && <span>Available Team Invitation:</span>}</Popover.Title>
            <Popover.Content>
                {teamsToJoin && teamsToJoin.map(item => <InviteItem
                    {...item}
                    accept={accept}
                    refuse={refuse}
                />)}
                {!teamsToJoin && player}
            </Popover.Content>
        </Popover>
    );
    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <div className={styles.bellBox}><Bell className={styles.bell}/></div>
        </OverlayTrigger>
    )
};

export default Notification;