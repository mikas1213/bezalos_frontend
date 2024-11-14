import styles from './Tikslai.module.css';
import RadioBig from '../ui/RadioBig';

const Tikslai = ({ formData, setFormData}) => {
    return (
        <div className={styles.radios}>
            {[
                'Svorio metimas', 
                'Liesos raumenų masės auginimas', 
                'Sveikatai palankūs mitybos įpročių formavimas',
                'Valgymo iššūkiai'
            ].map(goal => (
                <RadioBig key={goal} formData={formData} setFormData={setFormData} value={goal} name='goal' />
            ))}
        </div>
    );
};

export default Tikslai;