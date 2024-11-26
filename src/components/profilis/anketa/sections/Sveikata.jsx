import styles from './Sveikata.module.css';
import CheckBox from '../ui/CheckBox';
import Textarea from '../ui/Textarea';

const Sveikata = ({ formData, handleForm, errors, setErrors }) => {
    
    return (
        <>
            <CheckBox 
                name='health_problems' 
                label='Turiu sveikatos problemų.' 
                formData={formData} 
                handleForm={handleForm}
                setErrors={setErrors}
            />

            {formData.health_problems && <Textarea 
                name='health_problems_desc' 
                placeholder='Sveikatos problemos' 
                formData={formData}
                handleForm={handleForm}
                className={styles.mt_05}
                setErrors={setErrors}
            />}
            {errors && <span className='anketaError'>{errors}</span>}
        </>
    );
};

export default Sveikata;