import styles from './BodyTracking.module.css';
import Input from './Input';
import { Weight, Ruler } from 'lucide-react';

const fields = [
    {name: 'svoris', label: 'Svoris', ph: 'kg', icon: <Weight className={styles.icon} />},
    {name: 'bicepsas', label: 'Bicepsas', ph: 'kg', icon: <Ruler className={styles.icon} />},
    {name: 'talija', label: 'Talija', ph: 'kg', icon: <Ruler className={styles.icon} />},
    {name: 'sedmenys', label: 'Sėdmenys', ph: 'kg', icon: <Ruler className={styles.icon} />},
    {name: 'slaunis', label: 'Šlaunis', ph: 'kg', icon: <Ruler className={styles.icon} />},
]

const BodyTracking = ({ errors, setErrors, formData, setFormData, isLoadingAdd, addBodyTracking }) => {
    const handleAddBodyTracking = (e) => {
        e.preventDefault();
        addBodyTracking();
    };

    return (
        <div className={styles.bodyTracking}>
            <div className={styles.bodyTrackingHeader}>
            <span>👤 Sekite savo progresą</span>     
                <span>Įveskite kūno apimtis</span>
            </div>
            {errors?.find(err => err.path === 'all') && <div className={styles.mainError}>• {errors[0].msg}</div>}
            <form className={styles.bodyTrackingForm}>
                {fields.map(field => <Input 
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    icon={field.icon}
                    placeholder={field.ph}
                    formData={formData}
                    setFormData={setFormData}
                    error={errors ? errors.find(err => err.path === field.name)?.msg : ''}
                    setErrors={setErrors}
                />)}
                <button
                    disabled={isLoadingAdd}
                    className={styles.btn}
                    onClick={handleAddBodyTracking}
                >Pateikti</button>
            </form>
        </div>
    );
};

export default BodyTracking;