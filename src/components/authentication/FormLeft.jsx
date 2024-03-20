import styles from './FormLeft.module.css';

import { useContext } from 'react';
import { FormContext } from './AuthenticationForms';



const FormLeft = () => {
    const {changeFormState, setChangeFormState} = useContext(FormContext);
    
    return (
        <div className={styles.formLeft}>
            <h1>Labas!</h1>
            <div>
                <h3>Liko tik vienas žingsnis iki tavo</h3>
                <h3>ilgalaikių pokyčių starto</h3>
            </div>


            {changeFormState === 'signin' && <div className={styles.action}>
                <h4>Dar neturi paskyros?</h4>
                <button onClick={() => setChangeFormState('signup')}>REGISTRUOTIS</button>
            </div>}
            {(
                changeFormState === 'signup' || 
                changeFormState === 'forgot'||
                changeFormState === 'success-signup') && <div className={styles.action}>
                <h4>Jau turi paskyrą?</h4>
                <button onClick={() => setChangeFormState('signin')}>PRISIJUNGTI</button>
            </div>}
        </div>
    );
};

export default FormLeft;