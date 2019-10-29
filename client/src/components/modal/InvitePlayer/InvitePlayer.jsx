import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../CreateTeam/test.module.css';
import InfoMsg from "../../infoMsg";

const InvitePlayer = (props) => {
    let invite = '';
    const [player, setPlayer] = useState('');
    const {team, msg, ok, logo, captain, sendInvite, freePlayers} = props;
    return (
        <>
            <Modal.Header closeButton>
                <img src={logo} alt="Team logo"/>
                <h1 className={styles.teamName}>{team}</h1>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.modalBody}>
                    <p>Captain: {captain}</p>
                    <form className="form" onSubmit={(e) => {
                        e.preventDefault();
                        sendInvite(player || invite);
                    }}>
                        <div className="form-group">
                            <select value={player} onChange={e => setPlayer(e.target.value)}>{
                                freePlayers.map(
                                    (option, i) => {
                                        if(!i) {
                                            invite = option.userName;
                                        }
                                        return <option key={i}>{option.userName}</option>}
                                )
                            }</select>
                            <button className="btn btn-outline-secondary mr-2">Send invite
                            </button>
                        </div>
                    </form>
                </div>
                <InfoMsg ok={ok} msg={msg}/>
            </Modal.Body>
        </>
    );

};

export default InvitePlayer;