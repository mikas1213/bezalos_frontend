import styles from './ProgressBar.module.css';

const ProgressBar = ({ currentStep, totalSteps }) => {
    return(
        <div className={styles.progressBar}>
            <div 
                className={styles.progressBarFill}
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
        </div>
    );
};

export default ProgressBar;