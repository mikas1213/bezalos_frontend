import styles from './AccordionItem.module.css';
import { useState } from 'react';
import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';
import PolicyItem from './PolicyItem';

const AccordionItem = ({ policies, isFirstChild }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        
        <div 
            className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`} 
            onClick={() => setIsOpen(open => !open)}
        >
            {isFirstChild && <div className={styles.topLine}></div>}

            <AccordionHeader policies={policies} isOpen={isOpen} />
            <AccordionBody isOpen={isOpen}>
                <div className={styles.policies}>
                    {policies.policies.map((policy, i) => <PolicyItem 
                        key={i} 
                        policy={policy} 
                        reasons={policies.reasons}
                    />)}
                </div>
            </AccordionBody>
        </div>
    )
};

export default AccordionItem;
