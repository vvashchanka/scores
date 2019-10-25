import styles from "../../newComponents/LoginPage/styleVer2.module.css";
import {Col, Container, Row} from "react-bootstrap";
import React from "react";

const Header = (props) => {

    return (
        <div className={styles.header}>
            <Container>
                <Row>
                    <Col className={styles.godel}>Godel<span className={styles.football}>Football</span></Col>
                    <Col className={styles.navButtons}>
                        <button type="button" className={styles.navBarRegister}>Register</button>
                        <button type="button" className={styles.navBarLogin}>Login</button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};
export default Header