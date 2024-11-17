import styles from './PapildomaInfo.module.css';
import Textarea from '../ui/Textarea';

const PapildomaInfo = ({ formData, handleForm }) => {
    return (
        <Textarea 
            name='additional_info'
            formData={formData}
            handleForm={handleForm}
            maxLength={100}
            placeholder='Papildoma informacija'
            className={styles.mt_05} 
        />
    );
};

export default PapildomaInfo;