import styles from './Login.module.css';

import { useContext } from 'react';
import { FormContext } from '../AuthenticationForms';
    

const Login = () => {
    const {setChangeFormState} = useContext(FormContext);

    return (
        <div className={styles.login}>
            <h1>Log in</h1>

            <button onClick={() => setChangeFormState('signup')}>Sign up</button>
            <button onClick={() => setChangeFormState('forgot')}>Forgot Password</button>
        </div>
    );
};

export default Login;
