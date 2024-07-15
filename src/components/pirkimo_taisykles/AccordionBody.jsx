import styles from './AccordionBody.module.css';
import { useRef } from 'react';

const AccordionBody = ({ children, isOpen }) => {
    const contentHeight = useRef(null);

    return (
        <div ref={contentHeight} className={styles.accordionBody} style={
            isOpen 
            ? {height: contentHeight.current?.scrollHeight}
            : {height : '0px'}
        }>
            {children}
        </div>
    );
}

export default AccordionBody;