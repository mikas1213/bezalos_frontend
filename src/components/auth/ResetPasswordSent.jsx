import styles from './RestPasswordSent.module.css';
import { PiEnvelopeOpenDuotone } from "react-icons/pi";
import { FaRegPaperPlane } from "react-icons/fa";

import { useContext } from "react";
import { FormStateContext } from "./Authentication";
    

const SignupSuccess = () => {
    // const { setFormState } = useContext(FormStateContext);
    return (
        <div className={styles.signupSuccess}>

            <FaRegPaperPlane className={styles.icon} />
            <h2>Pasitikrink el. paštą</h2>

            <div className={styles.smallText}>
                <p>Nuorodą slaptažodžiui atkurti</p>
                <p>išsiuntėme el. paštu</p>
            </div>
            
            {/* <button onClick={() => setFormState('signin')}>PRISIJUNGTI</button> */}
        </div>
    );
};

export default SignupSuccess;