import styles from './RadioBig.module.css';
import { LuCheckCircle2 } from 'react-icons/lu';

const RadioBig = ({ formData, setFormData, name, value }) => {

    return (
        <div
            className={styles.radio}
            onClick={() => setFormData(prev => ({ ...prev, [`${name}`]: value }))}
        >
            <div>
                {value}
                {value === 'Valgymo iššūkiai' && <small>(Persivalgymai, emocinis valgymas, dietų patirtis)</small>}
            </div>          

            <div className={styles.iconContainer}>
            {formData[`${name}`] === value && (
            
                    <LuCheckCircle2 className={styles.icon} />
            )}
            </div>
        </div>
    );
};

export default RadioBig;