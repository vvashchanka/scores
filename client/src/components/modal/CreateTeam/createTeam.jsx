import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';
import styles from './test.module.css';
import defaultImage from '../../img/defaultImage'
import InfoMsg from "../../infoMsg";
import {ReactComponent as Download} from  "../../img/svg/download.svg"

const CreateTeam = (props) => {
    const {ok, msg} = props;
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
        <>
            <Modal.Header closeButton>
                <h2>Create Team</h2>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.modalBody}>
                    <input type="text" className={styles.inputTeam} onChange={e => setTeam(e.target.value)} placeholder={'Team Name'}/>
                    <input name="file" id="file" className={styles.inputfile} type="file" onChange={(e) => getBase64(e)} />
                    <label htmlFor="file">
                        <div className={styles.downloadButton}>
                            <p>Download team logo</p>
                            <Download className={styles.download}/>
                        </div>
                    </label>
                    <button className={styles.buttonCreate} onClick={() => create(team, img)}>CREATE</button>
                </div>
                <InfoMsg ok={ok} msg={msg}/>
            </Modal.Body>
        </>
    );

};

export default CreateTeam;