import styles from './DarboGrafikas.module.css';
import RadioBig from '../ui/RadioBig';
import CheckBox from '../ui/CheckBox';
import Textarea from '../ui/Textarea';

const DarboGrafikas = ({ formData, setFormData }) => {
    return (
        <div className={styles.radios}>
            {['Pastovus', 'Slenkantis', 'Laisvas grafikas', 'Tėvystės atostogos'].map(schedule => (
                <RadioBig key={schedule} formData={formData} setFormData={setFormData} value={schedule} name='schedule' />
            ))}

            {formData.schedule === 'Tėvystės atostogos' && 
                <>
                    <CheckBox 
                        className={styles.mt_1}
                        formData={formData} 
                        setFormData={setFormData} 
                        name='nevalgo' 
                        label='Ar šiuo metu maitini?' 
                    />
                    <Textarea 
                        className={styles.mt_05}
                        placeholder='Kokių maisto produktų nevalgai dėl mažylio netoleravimo?'
                        maxLength={200} 
                    />
                </>
            }
        </div>
    );
};

export default DarboGrafikas;