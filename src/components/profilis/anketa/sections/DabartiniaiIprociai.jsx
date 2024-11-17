import styles from './DabartiniaiIprociai.module.css';
import CheckBox from '../ui/CheckBox';
import Textarea from '../ui/Textarea';
import Timepicker from '../ui/Timepicker';


const habits = [
    {label: 'Pusryčiai', name: 'breakfast', chbx_label: 'Pasryčių nevalgau', text_place_holder: 'aprašyk'},
    {label: 'Pietūs', name: 'lunch', chbx_label: 'Pietų nevalgau', text_place_holder: 'aprašyk'},
    {label: 'Užkandis', name: 'snack', chbx_label: 'Užkandžių nevalgau', text_place_holder: 'aprašyk'},
    {label: 'Vakarienė', name: 'dinner', chbx_label: 'Vakarienės nevalgau', text_place_holder: 'aprašyk'}
];
const DabartiniaiIprociai = ({ formData, handleForm }) => {
    return (
        <div className={styles.dabartiniaiIprociai}>  
            <div>   
                <CheckBox 
                    name='diet' 
                    label='Yra tekę laikytis dienos' 
                    formData={formData}
                    handleForm={handleForm}
                />
                {formData.diet && <Textarea 
                    name='diet_desc' 
                    placeholder='Aprašyk juos' 
                    formData={formData}
                    handleForm={handleForm}
                    maxLength={100} 
                    className={styles.mt_05} 
                />}
            </div>
            <div>
                <CheckBox 
                    name='intolerance' 
                    label='Netoleruojami maisto produktai' 
                    formData={formData}
                    handleForm={handleForm}
                    className={styles.mt_1} 
                />
                {formData.intolerance && <Textarea 
                    name='intolerance_desc'
                    placeholder='Įrašyk juos' 
                    maxLength={50} 
                    formData={formData}
                    handleForm={handleForm}
                    className={styles.mt_05} 
                />}
            </div>

            <div className={`${styles.meals} ${styles.mt_1}`}>

                {habits.map(habit => <div key={habit.name} className={styles.mealContainer}>
                    <div className={styles.meal}>
                        <span className={styles.title}>{habit.label}</span>
                        <Timepicker 
                            name={`${habit.name}_time`} 
                            formData={formData}
                            handleForm={handleForm}
                        />    
                    </div>
                    <CheckBox
                        name={habit.name}
                        label={habit.chbx_label}
                        formData={formData}
                        handleForm={handleForm}
                        className={styles.mt_05} 
                    />

                    {!formData[habit.name] && <Textarea 
                        name={`${habit.name}_desc`}
                        formData={formData}
                        handleForm={handleForm}
                        maxLength={100}
                        placeholder={habit.text_place_holder}
                        className={styles.mt_05} 
                    />}
                </div>)}

            </div> 
        </div>
    );
};

export default DabartiniaiIprociai;