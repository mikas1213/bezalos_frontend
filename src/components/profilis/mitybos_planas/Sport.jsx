import styles from './Sport.module.css';

const Sport = ({ meal }) => {
    return (
        <div className={styles.sport}>
            <span>SPORTAS</span>
            <span>{meal.meal_time}</span>
        </div>
    );
};

export default Sport;