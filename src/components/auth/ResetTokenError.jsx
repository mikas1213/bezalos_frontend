import styles from './ResetTokenError.module.css';
import { PiXCircleFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';


const ResetTokenError = () => {
    const navigate = useNavigate();
    const handleCloseBtn = () => {
        navigate('/');
    };

    return (
        <div className={styles.resetTokenErrorPage}>
            <div className={styles.resetTokenCard}>

                <PiXCircleFill className={styles.icon} />
                <h2>Nuoroda neaktyvi</h2>

                <div className={styles.smallText}>
                    <p>Norėdami atkurti slaptažodį grįžkite</p>
                    <p>į prisijungimo langą</p>
                </div>

                <div className={styles.griztiContainer}>
                    <button onClick={handleCloseBtn}>GRĮŽTI</button>
                </div>
            </div>
        </div>
    );
};

export default ResetTokenError;
