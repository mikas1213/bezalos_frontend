import styles from './SignupInputs.module.css';

import { useState, useEffect } from 'react';
import { FaUser, FaLock } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { BsEyeFill } from "react-icons/bs";

import { useContext } from 'react';
import { SignUpContext } from './Signup';

import Input from '../Input';

const SignupInputs = () => {

    const {inputsData, setInputsData, errors} = useContext(SignUpContext);
    const [eyeOne, setEyeOne] = useState(false);
    const [eyeTwo, setEyeTwo] = useState(false);

    const [nameError, setNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [passwordConfirmedError, setPasswordConfirmedError] = useState();
    

    useEffect(() => {
        setNameError(errors?.find(v => v.path == 'name')?.msg);
        setEmailError(errors?.find(v => v.path == 'email')?.msg);
        setPasswordError(errors?.find(v => v.path == 'password')?.msg);
        setPasswordConfirmedError(errors?.find(v => v.path == 'passwordConfirmed')?.msg);
    }, [errors]);

    return (
        <div className={styles.inputs}>
            <Input 
                type='text' 
                name='name' 
                place='Vardas' 
                error={nameError}
                setError={setNameError}
                inputsData={inputsData} 
                onChange={setInputsData}
            >
                <FaUser className={styles.icon}/>
            </Input>

            <Input 
                type='text' 
                name='email' 
                place='El. paštas' 
                error={emailError}
                setError={setEmailError}
                inputsData={inputsData}                 
                onChange={setInputsData}
            >
                <FaEnvelope className={styles.icon}/>
            </Input>

            <Input 
                type={eyeOne ? 'text' : 'password'} 
                name='password'
                place='Slaptažodis'
                error={passwordError}
                setError={setPasswordError}
                inputsData={inputsData}
                onChange={setInputsData}
            >
                <FaLock className={styles.icon}/>
                <div className={styles.eyeIconContainer} onClick={() => setEyeOne((on) => !on)}>
                    {eyeOne ? 
                        (<BsEyeFill className={styles.eyeIcon} />) : 
                        (<RiEyeCloseLine className={styles.eyeIcon} 
                    />)}
                </div>
            </Input>

            <Input 
                type={eyeTwo ? 'text' : 'password'} 
                name='passwordConfirmed'
                place='Pakartokite slaptažodį'
                error={passwordConfirmedError}
                setError={setPasswordConfirmedError}
                inputsData={inputsData}
                onChange={setInputsData}
            >
                <FaLock className={styles.icon}/>
                <div className={styles.eyeIconContainer} onClick={() => setEyeTwo((on) => !on)}>
                    {eyeTwo ? 
                        (<BsEyeFill className={styles.eyeIcon} />) : 
                        (<RiEyeCloseLine className={styles.eyeIcon} 
                    />)}
                </div>
            </Input>
        </div>
    );
};

export default SignupInputs;