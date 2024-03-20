import styles from './Signup.module.css';
import { useState, createContext, useMemo } from 'react';
import axios from "../../../api/axios";

import SignupHeader from './SignupHeader';
import SignupInputs from './SignupInputs';
import SignupRadios from './SignupRadios';
import SignupBottom from './SignupBottom';
import Spinner from '../../UI/Spinner';

import { useContext } from 'react';
import { FormContext } from '../AuthenticationForms';

export const SignUpContext = createContext(null);

const Signup = () => {
    const {setChangeFormState} = useContext(FormContext);
    const [inputsData, setInputsData] = useState({
        name:'', 
        email: '', 
        initial_target: 'abu',
        password: '', 
        passwordConfirmed: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const providerInputsData = useMemo(() => ({inputsData, setInputsData, errors}), [inputsData, setInputsData, errors]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await axios.post('auth/signup', inputsData, {
                headers: {'Content-Tupe': 'application/json'},
                withCredentials: true
            });
            setIsLoading(false);
            setChangeFormState('success-signup');
        } catch(err) {
            setIsLoading(false);
            setErrors(err.response.data.errors)
        }
    };

    return (
        <SignUpContext.Provider value={providerInputsData}>
            {isLoading && <Spinner />}
            <form className={styles.signup} onSubmit={handleSubmit}>
                <SignupHeader />
                <SignupInputs />
                <SignupRadios />
                <SignupBottom />
            </form>
        </SignUpContext.Provider>
    );
};

export default Signup;
