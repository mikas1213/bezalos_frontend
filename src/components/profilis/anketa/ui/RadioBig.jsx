import { FaRegCircleCheck } from "react-icons/fa6";

import styles from './RadioBig.module.css';
const RadioBig = ({ name, value, formData, handleForm, setErrors }) => {

    return (
        <div
            className={styles.radio}
            onClick={() => {
                handleForm({name, value});
                setErrors({});
            }}
        >
            <div>
                {value}
                {value === 'Valgymo iššūkiai' && <small>(Persivalgymai, emocinis valgymas, dietų patirtis)</small>}
            </div>          

            <div className={styles.iconContainer}>
                {formData[name] === value && (
                    <FaRegCircleCheck className={styles.icon} />
                )}
            </div>
        </div>
    );
};

export default RadioBig;