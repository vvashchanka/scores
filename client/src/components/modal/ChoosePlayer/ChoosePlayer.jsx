import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import styles from '../CreateTeam/test.module.css';
import {ReactComponent as Approve} from "../../img/svg/approve.svg";

const ChoosePlayer = (props) => {

    return (
        <Modal.Dialog {...props}
                      size="s"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered>
            <Modal.Header closeButton centered>
                <h1>Choose player</h1>
            </Modal.Header>
            <Modal.Body closeButton>
                <div className={styles.wrapper}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Invite</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Mark</td>
                            <td><Approve className={styles.approve}/></td>
                        </tr>
                        <tr>
                            <td>Jacob</td>
                            <td><Approve className={styles.approve}/></td>
                        </tr>
                        <tr>
                            <td>Larry the Bird</td>
                            <td><Approve className={styles.approve}/></td>
                        </tr>
                        </tbody>
                    </Table>
                    <p>{props.message}</p>
                </div>
            </Modal.Body>
        </Modal.Dialog>
    );
};

export default ChoosePlayer;