import styles from './SignupInputs.module.css';

import { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { BsEyeFill } from "react-icons/bs";

import { useContext } from 'react';
import { SignUpContext } from './Signup';

import Input from '../Input';

const SignupInputs = () => {

    const [eyeOne, setEyeOne] = useState(false);
    const [eyeTwo, setEyeTwo] = useState(false);

    const {inputsData, setInputsData} = useContext(SignUpContext);
    console.log('inputsData: ', inputsData);

    return (
        <div className={styles.inputs}>
            <Input type='text' name='name' place='Vardas' inputsData={inputsData} onChange={setInputsData}>
                <FaUser className={styles.icon}/>
            </Input>

            <Input type='email' name='email' place='El. paštas' inputsData={inputsData} onChange={setInputsData}>
                <FaEnvelope className={styles.icon}/>
            </Input>

            <Input 
                type={eyeOne ? 'text' : 'password'} 
                name='password'
                place='Slaptažodis'
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