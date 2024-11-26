import styles from './FiziniaiDuomenys.module.css';
import Radio from '../ui/Radio';
import Input from '../ui/Input';

const FiziniaiDuomenys = ({ formData, handleForm, errors, setErrors }) => {
    return (
        <>
            <div className={styles.gender}>
                <Radio name='gender' value='Moteris' formData={formData} handleForm={handleForm} />
                <Radio name='gender' value='Vyras' formData={formData} handleForm={handleForm} />
            </div>

            <div className={styles.physicalData}>
                <Input placeholder='Įveskite amžių' name='age' label='Amžius' formData={formData} handleForm={handleForm} error={errors.age} setErrors={setErrors} />
                <Input placeholder='Įveskite ūgį' name='height' label='Ūgis (cm)' formData={formData} handleForm={handleForm} error={errors.height} setErrors={setErrors} />
                <Input placeholder='Įveskite svorį' name='weight' label='Svoris (kg)' formData={formData} handleForm={handleForm} error={errors.weight} setErrors={setErrors} />
                <Input placeholder='Įveskite vidutinį žingsnių skaičių per dieną' name='activity_steps' label='Aktyvumas žingsniais' formData={formData} handleForm={handleForm} error={errors.activity_steps} setErrors={setErrors} />
            </div>
        </>
    );
};

export default FiziniaiDuomenys;