import styles from './Authentication.module.css';
import { useState, createContext } from "react";

import Left from './Left';
import Signin from './Signin';
import Signup from './Signup';
import SignupSuccess from './SignupSuccess';
import ForgotPassword from './ForgotPassword';
import ResetPasswordSent from './ResetPasswordSent';

export const FormStateContext = createContext(null);

const Authentication = () => {
    const [formState, setFormState] = useState('signin');

    return (
        <FormStateContext.Provider value={{formState, setFormState}}>

            <div className={styles.autchentication}>
            
                {formState === 'success' || formState === 'token-sent' 
                    ?
                    <>
                        {formState === 'success' && <SignupSuccess /> }
                        {formState === 'token-sent' && <ResetPasswordSent />}
                    </>
                    : 
                    <>
                        <Left />
                        {formState === 'forgot' && <ForgotPassword />}
                        {formState === 'signin' && <Signin />}
                        {formState === 'signup' && <Signup />}
                    </>
                }
                
            </div>
        </FormStateContext.Provider>
    );
};

export default Authentication;