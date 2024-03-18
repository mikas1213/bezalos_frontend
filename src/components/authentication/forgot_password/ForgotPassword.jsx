import styles from './ForgotPassword.module.css';

import { useContext } from 'react';
import { FormContext } from '../AuthenticationForms';
    

const ForgotPassword = () => {
    const {setChangeFormState} = useContext(FormContext);
    return (
        <div className={styles.forgotPassword}>
            <h1>Forgot password</h1>
            <button onClick={() => setChangeFormState('signin')}>Login</button>
        </div>
    );
};

export default ForgotPassword;
