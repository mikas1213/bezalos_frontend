import styles from './RadioBig.module.css';
// import { LuCheckCircle2 } from 'react-icons/lu';

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
                    <p>tst</p>
                    // <LuCheckCircle2 className={styles.icon} />
                )}
            </div>
        </div>
    );
};

export default RadioBig;