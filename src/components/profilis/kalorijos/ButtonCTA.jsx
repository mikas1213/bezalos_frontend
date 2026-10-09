import { useNavigate } from 'react-router-dom';

import styles from './ButtonCTA.module.css';

const ButtonCTA = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.ctaContainer}>
            <div className={styles.ctaText}>
                Išbandyk narystę, kuri leis tau kurti receptus pagal parinktą kalorijų kiekį ir lengvai keisti ingredientus pagal savo poreikius.
            </div>
            <button type="button" onClick={() => navigate('/paslaugos')}>Išbandyti</button>
        </div>
    );
};

export default ButtonCTA;