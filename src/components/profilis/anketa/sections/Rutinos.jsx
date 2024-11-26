import styles from './Rutinos.module.css';
import Radio from '../ui/Radio';
import Timepicker from '../ui/Timepicker';
import { IoIosAdd } from "react-icons/io";
import { DeleteBin_icon } from '../../../../svg/icons';

const renderHabit = (type, name, label, day, handleForm, errors, setErrors) => {
    const err_id = `${name}_${day.day_id}`;
    
    return <div className={styles.activity}>
        <span style={{flexGrow: 1}}>{label}</span>
        
        {errors[err_id] && <span className='anketaError'>{errors[err_id][name]}</span>}

        <Timepicker
            type={type}
            name={name}
            formData={day}
            handleForm={handleForm}
            setErrors={setErrors}
        />
    </div>
}

const renderRoutine = (day, handleForm, deleteRoutine, type, errors, setErrors, i) => {
    
    return <div key={day.day_id} className={styles.rutina}>
        <div className={styles.titleContainer}>
            <span className={styles.rutinaTitle}>{type === 'workday' ? 'Darbo diena' : 'Laisvadienis'}</span>

            {i > 0 && <span className={styles.binIconContainer} onClick={() => deleteRoutine(type, day.day_id)}>
                <DeleteBin_icon icon={styles.binIcon} />
            </span>}
        </div>
        
        <div className={styles.radios}>
            <Radio 
                type={type}
                name='eat'
                value='Galiu valgyti betkada' 
                formData={day} 
                handleForm={handleForm} 
                className={styles.radioLabel}
                size='s'
            />
            <Radio 
                type={type}
                name='eat'
                value='Negaliu valgyti betkada' 
                formData={day} 
                handleForm={handleForm} 
                className={styles.radioLabel}
                size='s'
            />
        </div>

        <div className={styles.activities}>
            {renderHabit(type, 'get_up', 'Keliuosi', day, handleForm, errors, setErrors)}
            {renderHabit(type, 'go_sleep', 'Einu miegoti', day, handleForm, errors, setErrors)}
            {renderHabit(type, 'sport', 'Sportas', day, handleForm, errors, setErrors)}

            {day.eat === 'Negaliu valgyti betkada' && 
                <>
                    <div className={styles.divider} />
                    {renderHabit(type, 'breakfast_time', 'Pusryčius galiu valgyti', day, handleForm, errors, setErrors)}
                    {renderHabit(type, 'lunch_time', 'Pietus galiu valgyti', day, handleForm, errors, setErrors)}
                    {renderHabit(type, 'snack_time', 'Užkandį galiu valgyti', day, handleForm, errors, setErrors)}
                    {renderHabit(type, 'dinner_time', 'Vakarienę galiu valgyti', day, handleForm, errors, setErrors)}
                </>
            }
        </div>
    </div>
};

const renderNewRoutineBtn = (addRoutine, routine) => {
    return <div>
        <button className={styles.newRoutineBtn} onClick={() => addRoutine(routine)}>
            <IoIosAdd className={styles.icon} />Papildoma rutina
        </button>
        <div className={styles.explanation}>
            {routine === 'workday' ? '(Jeigu turi kitą darbo grafiką)' : '(Jeigu turi kitą laisvadienio grafiką)'}
        </div>
    </div>
};

const Rutinos = ({ formData, handleForm, addRoutine, deleteRoutine, errors, setErrors }) => {
    return (
        <div className={styles.rutinos}>    
            {formData.routines.workday.map((day, i) => 
                renderRoutine(day, handleForm, deleteRoutine, 'workday', errors, setErrors, i)
            )}
            {renderNewRoutineBtn(addRoutine, 'workday')}
            
            {formData.routines.day_off.map((day, i) => 
                renderRoutine(day, handleForm, deleteRoutine, 'day_off', errors, setErrors, i)
            )}
            {renderNewRoutineBtn(addRoutine, 'day_off')}

        </div>
    );
};

export default Rutinos;