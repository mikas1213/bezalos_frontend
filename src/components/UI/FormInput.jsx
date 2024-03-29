import styles from './FormInput.module.css';

import { FaUser, FaLock } from 'react-icons/fa6';
import { FaEnvelope } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import { BsEyeFill } from 'react-icons/bs';

const FormInput = ({ children, inputType, openEye, setOpenEye, errors }) => {

    return (
        <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
                {children}

                {inputType.indexOf('user') > -1 && <FaUser className={styles.icon} />}
                {inputType.indexOf('email') > -1 && <FaEnvelope className={styles.icon} />}
                {inputType.indexOf('password') > -1 && <FaLock className={styles.icon} />}
                {inputType.indexOf('password') > -1 && <div className={styles.eyeIconContainer} onClick={() => setOpenEye(eye => !eye)}>
                    {openEye ? (<BsEyeFill className={styles.eyeIcon} />) 
                    : (<RiEyeCloseLine className={styles.eyeIcon} /> )}
                </div>}
            </div>

            {errors[inputType] && (
                <span className={styles.inputError}>
                    {errors[inputType]?.message}
                </span>
            )}
        </div>
    );
};

export default FormInput;
