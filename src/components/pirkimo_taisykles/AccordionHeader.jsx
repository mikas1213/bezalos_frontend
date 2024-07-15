import styles from './AccordionHeader.module.css';
import { RiArrowLeftSLine } from 'react-icons/ri';

const AccordionHeader = ({ policies, isOpen }) => {
    return (
        <div className={`${styles.header} ${isOpen ? styles.open : ''}`}>
            <p>{policies.title}</p>
            <span>
                <RiArrowLeftSLine className={styles.icon} />
            </span>
        </div>
    );
};

export default AccordionHeader;
