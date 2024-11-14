import styles from './StepInfo.module.css';

const StepInfo = ({ steps, totalSteps, currentStep }) => {
    return (
        <div className={styles.stepInfo}>
            <h2 className={styles.stepTitle}>
                {steps[currentStep - 1].icon} 
                &nbsp;
                {steps[currentStep - 1].title}
            </h2>
            <p className={styles.stepNumber}>
                Žingsnis {currentStep} iš {totalSteps}
            </p>
        </div>
    );
};

export default StepInfo;