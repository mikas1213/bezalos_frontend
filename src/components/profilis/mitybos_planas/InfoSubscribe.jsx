import styles from './InfoSubscribe.module.css';
import { useEffect, useRef } from 'react';

const InfoSubscribe = ({ setIsShowChageProdList }) => {
    const ref = useRef(null);
    
    useEffect(() => {
        const handleOutsideClick = e => {
            if(ref.current && !ref.current.contains(e.target)) {
                setIsShowChageProdList(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [setIsShowChageProdList]);
    
    const handleSupratauClick = (e) => {
        e.stopPropagation();
        setIsShowChageProdList(false);
    };
    return (
        <div className={styles.overlay}>
            <div className={styles.info} ref={ref}>
                <span className={styles.infoText}>Šia funkcija gali naudotis tik narystę turintys vartotojai</span>
                <span 
                    className={styles.btn}
                    onClick={handleSupratauClick}
                    onMouseDown={(e) => e.stopPropagation()}
                >Supratau</span>
            </div>
        </div>
    );
};

export default InfoSubscribe;