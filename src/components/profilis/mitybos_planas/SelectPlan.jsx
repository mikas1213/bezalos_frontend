import styles from './SelectPlan.module.css';
import { useState, useEffect, useRef } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const SelectPlan = ({ plans, selectedPlan, setSelectedPlan}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    
    useEffect(() => {
        const handleOutsideClick = e => {
            if(ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [setIsOpen]);

    const handleTitleClick = (e) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
    };

    return (
        <>
        <div 
            className={styles.planTitle} 
            onClick={handleTitleClick}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <div>
                <span>Pasirinkti kitą rutiną</span>
                <span>{selectedPlan.title}</span>
            </div>
            <IoIosArrowBack className={`${styles.icon} ${isOpen ? styles.open : ''}`} />
        </div>

        <div 
            ref={ref} 
            className={`${styles.availablePlans} ${isOpen ? styles.open : ''}`}
        >
            {plans.map(plan => <AvailablePlan 
                key={plan.id} 
                plan={plan} 
                setSelectedPlan={setSelectedPlan} 
                setIsOpen={setIsOpen} 
                isSelected={plan.id === selectedPlan.id}
            /> )}
        </div>
        </>
    );
};

const AvailablePlan = ({ plan, setSelectedPlan, setIsOpen, isSelected }) => {
    return( 
        <div className={`${styles.availablePlan} ${isSelected ? styles.activePlan : ''}`} onClick={() => { setSelectedPlan(plan); setIsOpen(false)}}>
            <span className={styles.title}>{plan.title}</span>
            <div className={styles.bar}>
                <span>B {plan.b}</span>
                <span>A {plan.a}</span>
                <span>R {plan.r}</span>
                <span>Kcal {plan.kcal}</span>
            </div>
        </div>
    );
};

export default SelectPlan;