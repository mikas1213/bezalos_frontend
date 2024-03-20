import styles from './SuccessSignup.module.css';
import gif from '../../../assets/gifs/success.gif';

const SuccessSignup = () => {
    return (
        <div className={styles.successSignup}>
            <h1>Hello! Hello! Hello!</h1>
            <img src={gif} alt="succes gif" />
        </div>
    );
};

export default SuccessSignup;