import RadioBig from '../ui/RadioBig';

const Tikslai = ({ formData, handleForm, errors, setErrors }) => {
    
    return (
        <div>
            {[
                'Svorio metimas', 
                'Liesos raumenų masės auginimas', 
                'Sveikatai palankūs mitybos įpročių formavimas',
                'Valgymo iššūkiai'
            ].map(goal => (
                <RadioBig key={goal} formData={formData} handleForm={handleForm} value={goal} name='goal' setErrors={setErrors} />
            ))}
            {errors && <span className='anketaError'>{errors}</span>}
        </div>
    );
};

export default Tikslai;