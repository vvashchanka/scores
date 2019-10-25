import React from 'react';
import styles from './registerVer2.module.css';
import { Container, Row, Col, } from 'react-bootstrap';

const RegisterPageVer2 = (props) => {


    const { data, login, password, confirmPassword, userName, sendData, loginValue, passwordValue, confirmPasswordValue, userNameValue } = props;
    console.log(data);

    return (

        <div className={styles.registerWrapper}>
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
                                <label htmlFor="exampleInputFullName">Full Name</label>
                                <input type="password" className="form-control" id="exampleInputLogin"
                                       placeholder="Full Name"
                                       value={userName}
                                       onChange={e => userNameValue(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPass"
                                       placeholder="Password"
                                       value={password}
                                       onChange={e => passwordValue(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputConfPass">Confirm Password</label>
                                <input type="password" className="form-control" id="exampleInputConfPass"
                                       placeholder="Confirm Password"
                                       value={confirmPassword}
                                       onChange={e => confirmPasswordValue(e.target.value)}/>
                            </div>
                            <button  onClick={() => {sendData(data)}} type="button" className={styles.submitButton}>Register</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default RegisterPageVer2;