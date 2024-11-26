import styles from './DarboGrafikas.module.css';
import RadioBig from '../ui/RadioBig';
import CheckBox from '../ui/CheckBox';
import Textarea from '../ui/Textarea';

const DarboGrafikas = ({ formData, handleForm, errors, setErrors }) => {
    return (
        <div className={styles.radios}>
            {['Pastovus', 'Slenkantis', 'Laisvas grafikas', 'Tėvystės atostogos'].map(schedule => (
                <RadioBig key={schedule} formData={formData} handleForm={handleForm} value={schedule} name='schedule' setErrors={setErrors} />
            ))}

            {formData.schedule === 'Tėvystės atostogos' && 
                <>
                    <CheckBox 
                        className={styles.mt_1}
                        formData={formData} 
                        handleForm={handleForm} 
                        name='feeding' 
                        label='Ar šiuo metu maitini?' 
                        setErrors={setErrors}
                    />

                    {formData.feeding && <Textarea 
                        name='feeding_desc'
                        className={styles.mt_05}
                        placeholder='Kokių maisto produktų nevalgai dėl mažylio netoleravimo?'
                        formData={formData} 
                        handleForm={handleForm} 
                        setErrors={setErrors}
                    />}
                </>
            }
            {errors.schedule && <span className='anketaError'>{errors.schedule}</span>}
            {errors.feeding_desc && <span className='anketaError'>{errors.feeding_desc}</span>}
        </div>
    );
};

export default DarboGrafikas;