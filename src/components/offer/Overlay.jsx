import styles from './Overlay.module.css';
import { IoCloseSharp } from 'react-icons/io5';

const Overlay = ({ children, handleSentOffer }) => {

    return (
        <div className={styles.overLay}>      
            <div className={styles.offerModal}>
                <IoCloseSharp className={styles.icon} onClick={() => handleSentOffer()} />            
                {children}
            </div>
        </div>
    );
};

export default Overlay;