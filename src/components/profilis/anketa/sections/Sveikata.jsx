import styles from './Sveikata.module.css';
import CheckBox from '../ui/CheckBox';
import Textarea from '../ui/Textarea';

const Sveikata = ({ formData, handleForm }) => {
    return (
        <>
            <CheckBox 
                name='health_problems' 
                label='Turiu sveikatos problemų.' 
                formData={formData} 
                handleForm={handleForm}
            />

            {formData.health_problems && <Textarea 
                name='health_problems_desc' 
                placeholder='Sveikatos problemos' 
                formData={formData}
                handleForm={handleForm}
                maxLength={100} 
                className={styles.mt_05}
            />}
        </>
    );
};

export default Sveikata;