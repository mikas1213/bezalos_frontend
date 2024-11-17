import styles from './DarboGrafikas.module.css';
import RadioBig from '../ui/RadioBig';
import CheckBox from '../ui/CheckBox';
import Textarea from '../ui/Textarea';

const DarboGrafikas = ({ formData, handleForm }) => {
    return (
        <div className={styles.radios}>
            {['Pastovus', 'Slenkantis', 'Laisvas grafikas', 'Tėvystės atostogos'].map(schedule => (
                <RadioBig key={schedule} formData={formData} handleForm={handleForm} value={schedule} name='schedule' />
            ))}

            {formData.schedule === 'Tėvystės atostogos' && 
                <>
                    <CheckBox 
                        className={styles.mt_1}
                        formData={formData} 
                        handleForm={handleForm} 
                        name='feeding' 
                        label='Ar šiuo metu maitini?' 
                    />


                    {formData.feeding && <Textarea 
                        name='feeding_desc'
                        className={styles.mt_05}
                        placeholder='Kokių maisto produktų nevalgai dėl mažylio netoleravimo?'
                        maxLength={200} 
                        formData={formData} 
                        handleForm={handleForm} 
                    />}
                </>
            }
        </div>
    );
};

export default DarboGrafikas;