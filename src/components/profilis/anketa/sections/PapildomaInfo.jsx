import styles from './PapildomaInfo.module.css';
import Textarea from '../ui/Textarea';

const PapildomaInfo = ({ formData, handleForm, setErrors }) => {
    return (
        <Textarea 
            name='additional_info'
            formData={formData}
            handleForm={handleForm}
            setErrors={setErrors}
            placeholder='Papildoma informacija, kurią manai, kad man svarbu žinoti'
            className={styles.mt_05} 
        />
    );
};

export default PapildomaInfo;