import styles from './Form.module.css';

const Form = ({ children }) => {
    return (
        <div className={styles.form}>{children}</div>
    );
};

export default Form;