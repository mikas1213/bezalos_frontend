import styles from './SignupRadios.module.css';
import { IoInformationCircle } from "react-icons/io5";

// import { useState } from 'react';
import Radio from '../Radio';

import { useContext } from 'react';
import { SignUpContext } from './Signup';


const SignupRadios = () => {

    const {inputsData, setInputsData} = useContext(SignUpContext);
    // console.log('inputsData: ', inputsData);

    return (
        <>
            <div className={styles.maneDomina}>
                <h3>Mane domina: </h3>
                <IoInformationCircle className={styles.icon}/>
            </div>
            <div className={styles.radios}>
                {/* <Radio value='profilis' label='Sveikas svorio metimas' val={radioValue} setVal={setRadioValue} />
                <Radio value='virtuve' label='Išmokti valgyti be sąžinės graužimo' val={radioValue} setVal={setRadioValue} />
                <Radio value='abu' label='Abu aukščiau pateikti varijantai' val={radioValue} setVal={setRadioValue} />
                <Radio value='nezinau' label='Dar nežinau' val={radioValue} setVal={setRadioValue} /> */}

                <Radio value='profilis' label='Sveikas svorio metimas' val={inputsData} setVal={setInputsData} />
                <Radio value='virtuve' label='Išmokti valgyti be sąžinės graužimo' val={inputsData} setVal={setInputsData} />
                <Radio value='abu' label='Abu aukščiau pateikti varijantai' val={inputsData} setVal={setInputsData} />
                <Radio value='nezinau' label='Dar nežinau' val={inputsData} setVal={setInputsData} />

            </div>
        </>
    );
};

export default SignupRadios;