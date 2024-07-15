import styles from './AccordionItem.module.css';
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRef, useState } from 'react';
import PolicyItem from './PolicyItem';

const AccordionItem = ({ policy, isFirstChild }) => {
    
    const contentHeight = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    return (
        
        <div 
            className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`} 
            onClick={() => setIsOpen(open => !open)}
        >
            {isFirstChild && <div className={styles.bottomLine}></div>}
            <div className={styles.title}>
                <p>{policy.title}</p>
                <span><RiArrowLeftSLine className={styles.icon}/></span>
            </div>
            
            <div ref={contentHeight} className={styles.policyContainer} style={
                isOpen 
                ? {height: contentHeight.current?.scrollHeight}
                : {height : '0px'}
            }>
                <div className={styles.policy}>
                    {policy.policy.map((pol, i) => <PolicyItem key={i} policy={pol} reasons={policy.reasons}/>)}
                </div>
            </div>
        </div>
    )
};

export default AccordionItem;
