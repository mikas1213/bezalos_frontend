import styles from './Accordion.module.css';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

const AccordionItem = ({ icon, title, desc }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [desc]);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

      
    return (
        <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
            <div 
                className={styles.accordionItemHeader}
                onClick={toggleAccordion}
            >
                <span>{icon}</span>
                <span className={styles.accordionTitle}>{title}</span>
                <ChevronLeft className={styles.icon} />
            </div>

            <div 
                ref={contentRef}
                style={{ height: isOpen ? `${contentHeight}px` : '0' }}
                className={styles.accordionContent}
            >
                <div className={styles.accordionContentInner}>
                    {desc}
                </div>
            </div>
        </div>
    );
};


const Accordion = ({ paslauga }) => {

    return (
        <div className={styles.accordion}>
            {paslauga.details.map((item, i) => <AccordionItem 
                key={i} 
                icon={item.icon}
                title={item.title}
                desc={item.desc}
            />)}
        </div>
    );
};

export default Accordion;