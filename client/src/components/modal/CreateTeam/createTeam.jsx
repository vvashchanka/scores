import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';
import styles from './test.module.css';

const CreateTeam = (props) => {
    const [team, setTeam] = useState('');
    const [img, setImg] = useState('');

    const getBase64 = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImg(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    };
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
                    <input type="file" onChange={(e) => getBase64(e)}/>
                    <button className={styles.buttonCreate} onClick={() => props.team(team, img)}>CREATE</button>
                </div>
            </Modal.Body>
        </Modal.Dialog>
    );

};

export default CreateTeam;