import styles from './BodyTracking.module.css';
import Input from './Input';
import { Weight, Ruler } from 'lucide-react';

const BodyTracking = ({ formData, setFormData }) => {
    return (
        <div className={styles.bodyTracking}>
            <div className={styles.bodyTrackingHeader}>
                <span>Sekite savo progresą</span>     
                <span>Įveskite kūno apimtis</span>
            </div>

            <form className={styles.bodyTrackingForm}>
                <Input formData={formData} setFormData={setFormData} placeholder='kg' icon={<Weight className={styles.icon} />} label='Svoris' name='svoris' />
                <Input formData={formData} setFormData={setFormData} placeholder='cm' icon={<Ruler className={styles.icon} />} label='Bicepsas' name='bicepsas' />
                <Input formData={formData} setFormData={setFormData} placeholder='cm' icon={<Ruler className={styles.icon} />} label='Talija' name='talija' />
                <Input formData={formData} setFormData={setFormData} placeholder='cm' icon={<Ruler className={styles.icon} />} label='Sėdmenys' name='sedmenys' />
                <Input formData={formData} setFormData={setFormData} placeholder='cm' icon={<Ruler className={styles.icon} />} label='Šlaunis' name='slaunis' />
                <button className={styles.btn}>Pateikti</button>
            </form>
        </div>
    );
};

export default BodyTracking;