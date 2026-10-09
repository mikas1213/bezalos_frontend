import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import styles from './Pagination.module.css';

const Pagination = ({ currentStep, setCurrentStep, totalSteps, isValidFormPage, formData, isLoading, submitAnketa }) => {
    const [buttonStatus, setButtonStatus] = useState(formData.user_id ? 'Atnaujinti' : 'Pateikti');
    
    const handleNext = () => {

        if (currentStep < totalSteps) {
            if(isValidFormPage()) {
                setCurrentStep(prev => prev + 1);
            } 

        } else {
            setButtonStatus('Atnaujinti');
            submitAnketa();
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <div className={styles.pagination}>
            <button
                type="button"
                onClick={handlePrev}
                className={styles.btn}
                disabled={currentStep === 1}
            >
                <FaChevronLeft className={styles.icon} />
                Atgal
            </button>                
            <button
                type="button"
                disabled={!isLoading ? false : true}
                onClick={handleNext}
                className={`${styles.btn} ${styles.next} ${currentStep === totalSteps ? styles.btnEnd : ''}`}
            >
                
                {currentStep === totalSteps ? buttonStatus : 'Toliau' }
                {currentStep !== totalSteps && <FaChevronRight className={styles.icon} />}
            </button> 
        </div>
    )
};

export default Pagination;