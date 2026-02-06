import styles from './RestPasswordSent.module.css';
import { useNavigate } from "react-router-dom";
import { FaRegPaperPlane } from "react-icons/fa";
import { useAuth } from '../../features/auth';


const SignupSuccess = () => {
    const navigate = useNavigate();
    const { setIsOpenModal } = useAuth();

    const handleCloseBtn = () => {
        setIsOpenModal(false);
        navigate('/');
    };

    return (
        <div className={styles.succesContainer}>

            <FaRegPaperPlane className={styles.icon} />
            <h2>Pasitikrink el. paštą</h2>

            <div className={styles.smallText}>
                <p>Nuorodą slaptažodžiui atkurti</p>
                <p>išsiuntėme el. paštu</p>
            </div>
            
            <button onClick={handleCloseBtn}>Į pradžią</button>
        </div>
    );
};

export default SignupSuccess;