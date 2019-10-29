import React from 'react';
import styles from './styleVer2.module.css';
import { Container, Row, Col, } from 'react-bootstrap';


const LoginPageVer2 = (props) => {

    const { data, login, password, sendData, loginValue, passwordValue } = props;
    return (
        <div>
            <div className={styles.wrapper}>
                <Container>
                    <Row>
                        <Col>
                            <form>
                                <div className="form-group">
                                    <label className={styles.labelLogin} htmlFor="exampleInputEmail1">Login</label>
                                    <input type="login" className={styles.formControl} id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Login"
                                           value={login}
                                    onChange={e => loginValue(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={styles.formControl} id="exampleInputPassword1"
                                           placeholder="Password"
                                           value={password}
                                           onChange={e => passwordValue(e.target.value)}/>
                                </div>
                                <button onClick={() => {sendData(data)}} type="button" className={styles.submitButton}>Submit</button>
                                <p>{data.msg}</p>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};
export default LoginPageVer2;