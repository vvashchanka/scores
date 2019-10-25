import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import styles from '../CreateTeam/test.module.css';

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
                <div className={styles}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </Table>
                    <button className={styles.buttonCreate}>Submit</button>
                </div>
            </Modal.Body>
        </Modal.Dialog>
    );
};

export default ChoosePlayer;