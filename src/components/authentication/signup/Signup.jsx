import styles from './Signup.module.css';
import { useState, createContext, useMemo } from 'react';
import SignupHeader from './SignupHeader';
import SignupInputs from './SignupInputs';
import SignupRadios from './SignupRadios';
import SignupBottom from './SignupBottom';

export const SignUpContext = createContext(null);
const Signup = () => {
    
    const [inputsData, setInputsData] = useState({
        name:'', 
        email: '', 
        initial_target: 'abu',
        password: '', 
        passwordConfirmed: ''
    });

    const providerInputsData = useMemo(() => ({inputsData, setInputsData}), [inputsData, setInputsData]);

    return (
        <SignUpContext.Provider value={providerInputsData}>
            <form className={styles.signup}>
                <SignupHeader />
                <SignupInputs />
                <SignupRadios />
                <SignupBottom />
            {/* <button type='text' onClick={() => setChangeFormState('signin')}>Sign In</button> */}
            </form>
        </SignUpContext.Provider>
    );
};

export default Signup;
