import styles from './Overlay.module.css';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Overlay = ({ children, handleSentOffer }) => {

    return (
        <div className={styles.overLay}>      
            <div className={styles.offerModal}>
                <IoIosCloseCircleOutline className={styles.icon} onClick={() => handleSentOffer()} />            
                {children}
            </div>
        </div>
    );
};

export default Overlay;