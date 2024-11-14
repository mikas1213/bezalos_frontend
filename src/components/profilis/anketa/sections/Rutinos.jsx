import styles from './Rutinos.module.css';
import Radio from '../ui/Radio';
import Input from '../ui/Input';
import Timepicker from '../ui/Timepicker';


const Rutinos = ({ formData, handleForm }) => {
    return (
        <div className={styles.rutinos}>    
            <div className={styles.rutina}>
                <Input handleForm={handleForm} formData={formData} placeholder='Rutinos pavadinimas' name={'test'} label='Darbo diena'/>
                <div className={styles.radios}>
                    <Radio 
                        name='workday' 
                        value='Galiu valgyti betkada' 
                        formData={formData} 
                        handleForm={handleForm} 
                        className={styles.radioLabel}
                        size='s'
                    />
                    <Radio 
                        name='workday' 
                        value='Negaliu valgyti betkada' 
                        formData={formData} 
                        handleForm={handleForm} 
                        className={styles.radioLabel}
                        size='s'
                    />
                </div>

                <div className={styles.activities}>
                    <div className={styles.activity}>
                        <span>Keliuosi</span>
                        <Timepicker />
                    </div>
                    <div className={styles.activity}>
                        <span>Einu miegoti</span>
                        <Timepicker />
                    </div>
                    <div className={styles.activity}>
                        <span>Sportas</span>
                        <Timepicker />
                    </div>


                    {formData.workday === 'Negaliu valgyti betkada' && 
                    <>
                        <div className={styles.divider}></div>
                        <div className={styles.activity}>
                            <span>Pusryčius galiu valgyti</span>
                            <Timepicker />
                        </div>
                        <div className={styles.activity}>
                            <span>Pietus galiu valgyti</span>
                            <Timepicker />
                        </div>
                        <div className={styles.activity}>
                            <span>Užkandį galiu valgyti</span>
                            <Timepicker />
                        </div>
                        <div className={styles.activity}>
                            <span>Vakarienę galiu valgyti</span>
                            <Timepicker />
                        </div>
                    </>}
                </div>
            </div>

            <div className={styles.rutina}>
                <Input handleForm={handleForm} formData={formData} placeholder='Rutinos pavadinimas' name={'test'} label='Laisvadienis' />
                <div className={styles.radios}>
                    <Radio 
                        name='day_off' 
                        value='Galiu valgyti betkada' 
                        formData={formData} 
                        handleForm={handleForm} 
                        className={styles.radioLabel}
                        size='s'
                    />
                    <Radio 
                        name='day_off' 
                        value='Negaliu valgyti betkada' 
                        formData={formData} 
                        handleForm={handleForm} 
                        className={styles.radioLabel}
                        size='s'
                    />
                </div>

                <div className={styles.activities}>
                    <div className={styles.activity}>
                        <span>Keliuosi</span>
                        <Timepicker />
                    </div>
                    <div className={styles.activity}>
                        <span>Einu miegoti</span>
                        <Timepicker />
                    </div>
                    <div className={styles.activity}>
                        <span>Sportas</span>
                        <Timepicker />
                    </div>


                    {formData.day_off === 'Negaliu valgyti betkada' && 
                    <>
                        <div className={styles.divider}></div>
                        <div className={styles.activity}>
                            <span>Pusryčius galiu valgyti</span>
                            <Timepicker />
                        </div>
                        <div className={styles.activity}>
                            <span>Pietus galiu valgyti</span>
                            <Timepicker />
                        </div>
                        <div className={styles.activity}>
                            <span>Užkandį galiu valgyti</span>
                            <Timepicker />
                        </div>
                        <div className={styles.activity}>
                            <span>Vakarienę galiu valgyti</span>
                            <Timepicker />
                        </div>
                    </>}
                </div>

            </div>
        </div>
    );
};

export default Rutinos;