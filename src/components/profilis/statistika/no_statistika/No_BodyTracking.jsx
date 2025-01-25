import styles from './No_BodyTracking.module.css';
import { Weight, Ruler } from 'lucide-react';

const fields = [
    {name: 'svoris', label: 'Svoris', ph: 'kg', icon: <Weight className={styles.icon} />},
    {name: 'bicepsas', label: 'Bicepsas', ph: 'kg', icon: <Ruler className={styles.icon} />},
    {name: 'talija', label: 'Talija', ph: 'kg', icon: <Ruler className={styles.icon} />},
    {name: 'sedmenys', label: 'Sėdmenys', ph: 'kg', icon: <Ruler className={styles.icon} />},
    {name: 'slaunis', label: 'Šlaunis', ph: 'kg', icon: <Ruler className={styles.icon} />},
];

const No_BodyTracking = () => {

    return (
        <div className={styles.bodyTracking}>
            <div className={styles.bodyTrackingHeader}>
            <span>👤 Sekite savo progresą</span>     
                <span>Įveskite kūno apimtis</span>
            </div>

            <form className={styles.bodyTrackingForm}>
                {fields.map(field => 
                    <div key={field.name} className={styles.inputGroup}>
                        <span>{field.icon}{field.label}</span>
                        <input 
                            disabled={true}
                            type='text' 
                            placeholder={field.ph}
                        />
                    </div>
                )}
                <button disabled={true} className={styles.btn}>Pateikti</button>
            </form>
        </div>
    );
};

export default No_BodyTracking;