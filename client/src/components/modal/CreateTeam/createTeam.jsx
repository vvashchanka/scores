import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';
import styles from './test.module.css';
import defaultImage from './defaultImage'

const CreateTeam = (props) => {
    const [team, setTeam] = useState('');
    const [img, setImg] = useState('');
//Add default image if no image selected
    const create = (team, img) => {
        if (!img) {
            img = defaultImage}
            //Send data to parent component
        props.team(team, img)
    };
//Convert image file to base64
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
        <Modal.Dialog
                      size="s"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered>
            <Modal.Header>
                <h1>Create Team</h1>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.textCenter}>
                    <input type="text" className={styles.inputTeam} onChange={e => setTeam(e.target.value)} placeholder={'Team Name'}/>
                    <input type="file" onChange={(e) => getBase64(e)}/>
                    <button className={styles.buttonCreate} onClick={() => create(team, img)}>CREATE</button>
                </div>
            </Modal.Body>
        </Modal.Dialog>
    );

};

export default CreateTeam;