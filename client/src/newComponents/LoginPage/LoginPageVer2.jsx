import React from 'react';
import styles from './styleVer2.module.css';
import { Container, Row, Col, } from 'react-bootstrap';

const LoginPageVer2 = (props) => {


    const { data, login, password, sendData, loginValue, passwordValue } = props;
    console.log(data);
    return (
        <div>
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
            <div className={styles.wrapper}>
                <Container>
                    <Row>
                        <Col>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Login</label>
                                    <input type="login" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Login"
                                           value={login}
                                    onChange={e => loginValue(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1"
                                           placeholder="Password"
                                           value={password}
                                           onChange={e => passwordValue(e.target.value)}/>
                                </div>
                                <button onClick={() => {sendData(data)}} type="button" className={styles.submitButton}>Submit</button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};
export default LoginPageVer2;