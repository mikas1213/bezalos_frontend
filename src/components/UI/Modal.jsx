import { useEffect, useRef } from 'react';
import {createPortal} from 'react-dom';

import { HiXMark } from "react-icons/hi2";
import styles from './Modal.module.css';

const Modal = ({children, onClose}) => {
    
    const ref = useRef(null);
    useEffect(() => {
        const handleClick = e => {
            if(ref.current && !ref.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => document.removeEventListener('click', handleClick, true);
    }, [onClose]);

    return createPortal(
        <div className={styles.modalOverlay}>
            <div ref={ref} className={styles.modal}>
                <button className={styles.close} onClick={onClose}><HiXMark className={styles.icon} /></button>
                {children}
            </div>
        </div>, document.body
    );
};

export default Modal;