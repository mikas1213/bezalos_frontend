import styles from './RestPasswordSent.module.css';
import { useNavigate } from "react-router-dom";
import { FaRegPaperPlane } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';

const SignupSuccess = () => {
    const navigate = useNavigate();
    const {setIsOpenModal} = useAuth();

    const handleCloseBtn = () => {
        setIsOpenModal(false);
        navigate('/');
    };

    return (
        <div className={styles.signupSuccess}>

            <FaRegPaperPlane className={styles.icon} />
            <h2>Pasitikrink el. paštą</h2>

            <div className={styles.smallText}>
                <p>Nuorodą slaptažodžiui atkurti</p>
                <p>išsiuntėme el. paštu</p>
            </div>
            
            <div className={styles.griztiContainer}>
                <button onClick={handleCloseBtn}>Į pradžią</button>
            </div>
        </div>
    );
};

export default SignupSuccess;