import styles from './Input.module.css';
// import { useState } from 'react';
// import { 
    // IoInformationCircle, 
    // IoAmmrtCircle, 
    // IoCheckmarkCircle 
// } from "react-icons/io5";

// const validations = {
//     name: /.*/,
//     email: /^[\w-.]+@([\w-]+\.)+[\w]{2,}$/,
//     password: /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/,
//     passwordConfirmed: /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/,
// }
const Input = ({children, type, place, name, inputsData, error, setError, onChange}) => {
    
    // const [inputFocus, setInputFocus] = useState(false);
    let inputStateClass = '';
    if(error) inputStateClass = 'invalid'
    // if(inputFocus) inputStateClass = 'focus';
    // if(inputsData[name] && validations[name].test(inputsData[name])) {
    //     inputStateClass = 'valid';
    // } else if(inputsData[name] && !validations[name].test(inputsData[name]))   {
    //     inputStateClass = 'invalid';
    // } else if(inputFocus) {
    //     inputStateClass = 'focus';
    // }

    const handleOnChange = e => {
        setError('');
        return onChange({...inputsData, [name]: e.target.value});
    };

    return (
        <>
        <div className={styles.inputGroup}>
            <input
                type={type}
                value={inputsData[name]}
                name={name}
                className={styles[inputStateClass]}
                // onChange={(e) => onChange({...inputsData, [name]: e.target.value})}
                onChange={handleOnChange}
                placeholder={place}
                autoComplete='off'
                // onFocus={() => setInputFocus(true)}
                // onBlur={() => setInputFocus(false)}
            />
            {children}
            {/* <IoInformationCircle className={styles.icon }/> */}
            
        </div>
        <span className={styles.inputError}>{error}</span>
        </>
    );
};

export default Input;