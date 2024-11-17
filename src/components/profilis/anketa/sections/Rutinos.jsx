import styles from './Rutinos.module.css';
import Radio from '../ui/Radio';
import Timepicker from '../ui/Timepicker';
import { IoIosAdd } from "react-icons/io";
import { DeleteBin_icon } from '../../../../svg/icons';

const renderHabit = (type, name, label, day, handleForm) => {
    return <div className={styles.activity}>
        <span>{label}</span>
        <Timepicker 
            type={type}
            name={name}
            formData={day}
            handleForm={handleForm}
        />
    </div>
}

const renderRoutine = (day, handleForm, type) => {
    
    return <div key={day.id} className={styles.rutina}>
        <div className={styles.titleContainer}>
            <span className={styles.rutinaTitle}>{type === 'workday' ? 'Darbo diena' : 'Laisvadienis'}</span>
            <span className={styles.binIconContainer}>
                <DeleteBin_icon icon={styles.binIcon} />
            </span>
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
            {renderHabit(type, 'get_up', 'Keliuosi', day, handleForm)}
            {renderHabit(type, 'go_sleep', 'Einu miegoti', day, handleForm)}
            {renderHabit(type, 'sport', 'Sportas', day, handleForm)}

            {day.eat === 'Negaliu valgyti betkada' && 
                <>
                    <div className={styles.divider} />
                    {renderHabit(type, 'breakfast', 'Pusryčius galiu valgyti', day, handleForm)}
                    {renderHabit(type, 'lunch', 'Pietus galiu valgyti', day, handleForm)}
                    {renderHabit(type, 'snack', 'Užkandį galiu valgyti', day, handleForm)}
                    {renderHabit(type, 'dinner', 'Vakarienę galiu valgyti', day, handleForm)}
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

const Rutinos = ({ formData, handleForm, addRoutine }) => {
    return (
        <div className={styles.rutinos}>    
            {formData.routines.workday.map(day => 
                renderRoutine(day, handleForm, 'workday')
            )}

            {/* <div className={styles.newRoutine}>
                <button className={styles.newRoutineBtn} onClick={() => addRoutine('workday')}>
                    <IoIosAdd className={styles.icon} />Papildoma rutina
                </button>
                <div className={styles.explanation}>(Jeigu turi kitą darbo grafiką)</div>
            </div> */}
            {renderNewRoutineBtn(addRoutine, 'workday')}
            
            {formData.routines.day_off.map(day => 
                renderRoutine(day, handleForm, 'day_off')
            )}
            {renderNewRoutineBtn(addRoutine, 'day_off')}
            {/* {formData.routines.workday.map(day => <div key={day.id} className={styles.rutina}>
                <span className={styles.rutinaTitle}>Darbot diena</span>
                
                <div className={styles.radios}>
                    <Radio 
                        type='workday'
                        name='eat'
                        value='Galiu valgyti betkada' 
                        formData={day} 
                        handleForm={handleForm} 
                        className={styles.radioLabel}
                        size='s'
                    />
                    <Radio 
                        type='workday'
                        name='eat'
                        value='Negaliu valgyti betkada' 
                        formData={day} 
                        handleForm={handleForm} 
                        className={styles.radioLabel}
                        size='s'
                    />
                </div>

                <div className={styles.activities}>
                    {renderHabit('workday', 'get_up', 'Keliuosi', day, handleForm)}
                    {renderHabit('workday', 'go_sleep', 'Einu miegoti', day, handleForm)}
                    {renderHabit('workday', 'sport', 'Sportas', day, handleForm)}

                    {day.eat === 'Negaliu valgyti betkada' && 
                        <>
                            <div className={styles.divider} />
                            {renderHabit('workday', 'breakfast', 'Pusryčius galiu valgyti', day, handleForm)}
                            {renderHabit('workday', 'lunch', 'Pietus galiu valgyti', day, handleForm)}
                            {renderHabit('workday', 'snack', 'Užkandį galiu valgyti', day, handleForm)}
                            {renderHabit('workday', 'dinner', 'Vakarienę galiu valgyti', day, handleForm)}

                        </>
                    }
                </div>
            </div>)}

            {formData.routines.day_off.map(day =>
                <div key={day.id} className={styles.rutina}>
                    <span className={styles.rutinaTitle}>Laisvadienis</span>
                    <div className={styles.radios}>
                        <Radio 
                            type='day_off'
                            name='eat'
                            value='Galiu valgyti betkada' 
                            formData={day} 
                            handleForm={handleForm} 
                            className={styles.radioLabel}
                            size='s'
                        />
                        <Radio 
                            type='day_off'
                            name='eat'
                            value='Negaliu valgyti betkada' 
                            formData={day} 
                            handleForm={handleForm} 
                            className={styles.radioLabel}
                            size='s'
                        />
                    </div>

                    <div className={styles.activities}>
                        {renderHabit('day_off', 'get_up', 'Keliuosi', day, handleForm)}
                        {renderHabit('day_off', 'go_sleep', 'Einu miegoti', day, handleForm)}
                        {renderHabit('day_off', 'sport', 'Sportas', day, handleForm)}

                        {day.eat === 'Negaliu valgyti betkada' && 
                            <>
                                <div className={styles.divider} />
                                {renderHabit('day_off', 'breakfast', 'Pusryčius galiu valgyti', day, handleForm)}
                                {renderHabit('day_off', 'lunch', 'Pietus galiu valgyti', day, handleForm)}
                                {renderHabit('day_off', 'snack', 'Užkandį galiu valgyti', day, handleForm)}
                                {renderHabit('day_off', 'dinner', 'Vakarienę galiu valgyti', day, handleForm)}
                            </>
                        }
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default Rutinos;