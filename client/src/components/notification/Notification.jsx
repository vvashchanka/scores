import React from "react";
import {Popover, OverlayTrigger, Button} from "react-bootstrap";
import {ReactComponent as Bell} from "../img/svg/bell.svg";
import styles from "./notification.module.css"

const Notification = (props) => {
    const {header, accept, refuse} = props;
    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                {header}PUSSY HUNTER wants to enter ОльгаВалентиновна
                <div className={styles.btnWrapper}>
                    <Button variant="success" size="sm" onClick={accept}>Accept</Button>
                    <Button variant="danger" size="sm"  onClick={refuse}>Refuse</Button>
                </div>
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