import styles from './StepIndicator.module.css';

const StepIndicator = ({ steps, currentStep, setCurrentStep, isValidFormPage }) => {
    
    return (
        <div className={styles.stepIndicator}>
            {steps.map(step => (
                <div 
                    key={step.id}
                    onClick={() => {
                        if(isValidFormPage()) {
                            setCurrentStep(step.id);
                        }
                    }}
                    className={`${styles.step} ${
                        step.id === currentStep 
                        ? `${styles.active}` 
                        : step.id < currentStep 
                            ? `${styles.green}`
                            : `${styles.grey}`
                    }`}>
                    <div className={styles.icon}>{step.icon}</div>
                    <div className={styles.dot} />
                </div>
            ))}
        </div>
    );
};

export default StepIndicator;