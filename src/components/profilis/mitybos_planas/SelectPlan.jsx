import styles from './SelectPlan.module.css';
import { useState, useEffect, useRef } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const SelectPlan = ({ plans, selectedPlan, setSelectedPlan}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = e => {
            if(ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, [setIsOpen]);

    return (
        <>
        <div className={styles.planTitle} onClick={() => setIsOpen(on => !on)}>
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
            /> )}
        </div>
        </>
    );
};

const AvailablePlan = ({ plan, setSelectedPlan, setIsOpen }) => {
    return( 
        <div className={styles.availablePlan} onClick={() => { setSelectedPlan(plan); setIsOpen(false)}}>
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