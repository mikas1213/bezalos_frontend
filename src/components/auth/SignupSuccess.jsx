import styles from './SignupSuccess.module.css';
import { ImCheckmark2 } from "react-icons/im";

import { useContext } from "react";
import { FormStateContext } from "./Authentication";
    

const SignupSuccess = () => {
    const { setFormState } = useContext(FormStateContext);

    return (
        <div className={styles.succesContainer}>

            <ImCheckmark2 className={styles.icon}/>
            <h2>Tavo profilis sukurtas</h2>

            <div className={styles.smallText}>
                <p>Sveikinu tave tapus</p>
                <p>Valgau be žalos bendruomenės dalimi 💚</p>
            </div>
            
            <button onClick={() => setFormState('signin')}>Prisijungti</button>
        </div>
    );
};

export default SignupSuccess;