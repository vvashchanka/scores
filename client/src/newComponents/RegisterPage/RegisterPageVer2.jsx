import React from 'react';
import styles from './registerVer2.module.css';

import { Container, Row, Col } from 'react-bootstrap';


const RegisterPageVer2 = (props) => {
    const {
        data,
        login,
        password,
        confirmPassword,
        userName,
        sendData,
        loginValue,
        passwordValue,
        confirmPasswordValue,
        userNameValue
    } = props;

    const formFields = [
        {
            htmlFor: 'Login',
            title: 'Login',
            value: login,
            type: 'text',
            onChange: loginValue
        },
        {
            htmlFor: 'Full Name',
            title: 'Full Name',
            value: userName,
            type: 'text',
            onChange: userNameValue
        },
        {
            htmlFor: 'Password',
            title: 'Password',
            value: password,
            type: 'password',
            onChange: passwordValue
        },
        {
            htmlFor: 'Password confirm',
            title: 'Confirm password',
            value: confirmPassword,
            type: 'password',
            onChange: confirmPasswordValue
        }

    ]

    return (
        <div className={styles.registerWrapper}>
            <Container>
                <Row>
                    <Col>
                        <form>
                            <label className={styles.labelLogin}>Register</label>
                            {formFields.map(({htmlFor, title, value, type, onChange}) =>
                                <Input
                                    htmlFor={htmlFor}
                                    title={title}
                                    value={value}
                                    type={type}
                                    onChange={onChange}
                                />)}
                            <button onClick={() => {
                                sendData(data)
                            }} type="button" className={styles.submitButton}>Register
                            </button>
                            <p>{data.msg}</p>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default RegisterPageVer2;

// TODO separate comp
const Input = ({htmlFor, title, value, type, onChange}) => {
    return (
        <div className="form-group">
            <input type={type}
                   className={styles.formControl}
                   placeholder={title}
                   id={htmlFor}
                   value={value}
                   onChange={e => onChange(e.target.value)}/>
        </div>
    )
}