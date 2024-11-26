import styles from './DabartiniaiIprociai.module.css';
import CheckBox from '../ui/CheckBox';
import Textarea from '../ui/Textarea';
import Timepicker from '../ui/Timepicker';


const habits = [
    {label: 'Pusryčiai', name: 'breakfast', chbx_label: 'Pasryčių nevalgau', text_place_holder: 'Aprašyk DABAR dažniausiai valgomus produktus ir/ar patiekalus'},
    {label: 'Pietūs', name: 'lunch', chbx_label: 'Pietų nevalgau', text_place_holder: 'Aprašyk DABAR dažniausiai valgomus produktus ir/ar patiekalus'},
    {label: 'Užkandis', name: 'snack', chbx_label: 'Užkandžių nevalgau', text_place_holder: 'Aprašyk DABAR dažniausiai valgomus produktus ir/ar patiekalus'},
    {label: 'Vakarienė', name: 'dinner', chbx_label: 'Vakarienės nevalgau', text_place_holder: 'Aprašyk DABAR dažniausiai valgomus produktus ir/ar patiekalus'}
];
const DabartiniaiIprociai = ({ formData, handleForm, errors, setErrors }) => {
    
    return (
        <div>  
            <div>   
                <CheckBox 
                    name='diet' 
                    label='Yra tekę laikytis dietų' 
                    formData={formData}
                    handleForm={handleForm}
                    setErrors={setErrors}
                />
                {formData.diet && <Textarea 
                    name='diet_desc' 
                    placeholder='Aprašyk savo patirtį jų besilaikant' 
                    formData={formData}
                    handleForm={handleForm}
                    className={styles.mt_05} 
                    setErrors={setErrors}
                />}
                {errors.diet_desc && <span className='anketaError'>{errors.diet_desc}</span>}
            </div>
            <div>
                <CheckBox 
                    name='intolerance' 
                    label='Netoleruojami maisto produktai' 
                    formData={formData}
                    handleForm={handleForm}
                    className={styles.mt_1} 
                    setErrors={setErrors}
                />
                {formData.intolerance && <Textarea 
                    name='intolerance_desc'
                    placeholder='Įrašyk juos' 
                    formData={formData}
                    handleForm={handleForm}
                    className={styles.mt_05} 
                    setErrors={setErrors}
                />}
                {errors.intolerance_desc && <span className='anketaError'>{errors.intolerance_desc}</span>}
            </div>

            <div className={`${styles.meals} ${styles.mt_1}`}>
                {habits.map(habit => <div key={habit.name} className={styles.mealContainer}>
                    <div className={styles.meal}>
                        <span className={styles.title}>{habit.label}</span>
                        <Timepicker 
                            name={`${habit.name}_time`} 
                            formData={formData}
                            handleForm={handleForm}
                            setErrors={setErrors}
                        />    
                        {errors[`${habit.name}_time`] && <span className='anketaError'>{errors[`${habit.name}_time`]}</span>}
                    </div>
                    <CheckBox
                        name={habit.name}
                        label={habit.chbx_label}
                        formData={formData}
                        handleForm={handleForm}
                        className={styles.mt_05} 
                        setErrors={setErrors}
                    />

                    {!formData[habit.name] && <Textarea 
                        name={`${habit.name}_desc`}
                        formData={formData}
                        handleForm={handleForm}
                        placeholder={habit.text_place_holder}
                        className={styles.mt_05} 
                        setErrors={setErrors}
                    />}
                    {errors[`${habit.name}_desc`] && <span className='anketaError'>{errors[`${habit.name}_desc`]}</span>}
                </div>)}

            </div> 
        </div>
    );
};

export default DabartiniaiIprociai;