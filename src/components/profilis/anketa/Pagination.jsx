import styles from './Pagination.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentStep, setCurrentStep, totalSteps }) => {

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
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
                onClick={handlePrev}
                className={styles.btn}
                disabled={currentStep === 1}
            >
                <FaChevronLeft className={styles.icon} />
                Atgal
            </button>                
            <button
                onClick={handleNext}
                className={`${styles.btn} ${styles.next}`}
            >
                {currentStep === totalSteps ? 'Pateikti' : 'Toliau'}
                {currentStep !== totalSteps && <FaChevronRight className={styles.icon} />}
            </button>
        </div>
    )
};

export default Pagination;