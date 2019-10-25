import React from 'react';
import styles from './input.module.css'

const Input = (props) => {
    const { id, type, value, onValueChange } = props;

    return (
        <div className={styles.form__group}><label className={styles.form__label} htmlFor={id}>{id}</label><input
            className={styles.form__input} id={id} type={type} required="required"
            value={value} onChange={e => onValueChange(id, e.target.value)}/>
        </div>
    );
};
export default Input