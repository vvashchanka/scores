import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';
import styles from './test.module.css';

const CreateTeam = (props) => {
    const [team, setTeam] = useState('');
    return (
        <Modal.Dialog {...props}
                      size="s"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered>
            <Modal.Header closeButton>
                <h1>Create Team</h1>
            </Modal.Header>
            <Modal.Body closeButton>
                <div className={styles.textCenter}>
                    <input type="text" className={styles.inputTeam} onChange={e => setTeam(e.target.value)} placeholder={'Team Name'}/>
                    <button className={styles.buttonCreate} onClick={() => props.team(team)}>CREATE</button>
                </div>
            </Modal.Body>
        </Modal.Dialog>
    );

};

export default CreateTeam;