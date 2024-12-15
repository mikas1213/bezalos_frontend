import styles from './KalorijosHeader.module.css';
import { Heart, ChevronLeft, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const options = [
    {id: 1, icon: '🪑', title: 'Sėdimas darbas', paragraph: 'Mažai arba visai nejudama'},
    {id: 2, icon: '🚶', title: 'Lengvas aktyvumas', paragraph: '1-2 treniruortės per savaitę'},
    {id: 3, icon: '🏃', title: 'Vidutinis aktyvumas', paragraph: '3-5 treniruotės per savaitę'},
    {id: 4, icon: '🏋️', title: 'Aukštas aktyvumas', paragraph: '6-7 treniruotės per savaitę'},
    {id: 5, icon: '⚡️', title: 'Labai aukštas aktyvumas', paragraph: 'Intensyvios treniruotės 2x per dieną'},
];

const ratios = {
    1: 1.2,
    2: 1.375,
    3: 1.55, 
    4: 1.725,
    5: 1.9
}
const Option = ({ option, nr, icon, title, paragraph, selected, setCalculations, closeOption }) => {
    
    return (
        <div className={styles.option} onClick={() => {
            setCalculations(prev => ({...prev, [option]: nr, ...(option === 'activity' ? { ratio: ratios[nr] } : {})}));
            closeOption(false);
        }}>
            <div className={styles.optionIcon}>{icon}</div>
            <div className={styles.optionContent}>
                <span className={styles.optionTitle}>{title}</span>
                <span className={styles.optioValue}>{paragraph}</span>
            </div>
            {selected && <Check className={styles.checkIcon} />}
        </div>
    );
};


const KalorijosHeader = ({ calculations, setCalculations }) => {
    const [genderOpen, setGenderOpen] = useState(false);
    const [activityOpen, setActivityOpen] = useState(false);
    const refGender = useRef(null);
    const refActivity = useRef(null);

    useEffect(() => {

        const handleOutsideClick = (e) => {
            if(refGender.current && !refGender.current.contains(e.target)) {
                setActivityOpen(false);
            }
            if(refActivity.current && !refActivity.current.contains(e.target)) {
                setGenderOpen(false);
            }
        }
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    const handleSetInputs = e => {
        setCalculations(prev => ({...prev, [e.target.name]: e.target.value.replace(',', '.')}))
    }


    return (
        <div className={styles.calculatorContainer}>

            <div className={styles.calculatorHeader}>
                <Heart className={styles.heartIcon} />
                <h1>Kalorijų skaičiuoklė</h1>
                <p>Apskaičiuokite dienos kalorijų ir maistinių medžiagų poreikį</p>
            </div>


            <div className={styles.calculator}>
                <div className={styles.inputGroup}>
                    <span className={styles.label}>Lytis</span>
                    <div className={`${styles.gender} ${genderOpen ? styles.open : ''}`} 
                        onClick={(e) => {
                            setGenderOpen(!genderOpen); 
                            e.stopPropagation()
                        }}>
                        {calculations.gender}
                        <ChevronLeft className={styles.selectIcon} />
                    </div>

                    <div ref={refGender} className={`${styles.genderOptions} ${genderOpen ? styles.showOptions : ''}`}>
                        {['Moteris', 'Vyras'].map(option => <Option 
                            key={option}
                            icon={option === 'Moteris' ? '🙋‍♀️' : '🙋‍♂️'}
                            option='gender' 
                            title={option}
                            nr={option}
                            selected={calculations.gender === option} 
                            setCalculations={setCalculations} 
                            closeOption={setGenderOpen} 
                        />)}
                    </div>
                </div>


                <div className={styles.inputGroup}>
                    <span className={styles.label}>Amžius</span>
                    <input 
                        name='age' 
                        type='text'
                        inputMode='decimal'
                        autoComplete='off'
                        value={calculations.age} 
                        onChange={handleSetInputs}
                        className={styles.age}
                        placeholder='m'
                    />
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.label}>Ūgis</span>
                    <input 
                        name='height' 
                        type='text'
                        inputMode='decimal'
                        autoComplete='off'
                        value={calculations.height} 
                        onChange={handleSetInputs}
                        className={styles.height}   
                        placeholder='cm' 
                    />
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.label}>Svoris</span>
                    <input 
                        name='weight' 
                        type='text'
                        inputMode='decimal'
                        autoComplete='off'
                        value={calculations.weight} 
                        onChange={handleSetInputs}
                        className={styles.weight}   
                        placeholder='kg'
                    />
                </div>
                

                <div className={styles.inputGroup}>
                    <span className={styles.label}>Aktyvumas</span>
                    <div 
                        className={`${styles.activity} ${activityOpen ? styles.open : ''}`} 
                        onClick={(e) => {
                            setActivityOpen(!activityOpen); 
                            e.stopPropagation()
                        }}>
                            
                        {calculations.activity > 0 ? options[calculations.activity-1].title : 'Pasirink aktyvumo lygį'}                        
                        <ChevronLeft className={styles.selectIcon} />
                    </div>

                    <div ref={refActivity} className={`${styles.activityOptions} ${activityOpen ? styles.showOptions : ''}`}>
                        {options.map(option => <Option 
                            nr={option.id}
                            key={option.id} 
                            icon={option.icon} 
                            option='activity'                            
                            title={option.title} 
                            paragraph={option.paragraph}
                            selected={calculations.activity === option.id}
                            setCalculations={setCalculations}
                            closeOption={setActivityOpen}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KalorijosHeader;