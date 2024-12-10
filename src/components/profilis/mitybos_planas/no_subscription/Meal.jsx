import styles from './Meal.module.css';
import { IoIosArrowBack } from 'react-icons/io';


const Meal = ({ title }) => {

    return (
        <div className={styles.meal}>
            <div className={styles.mealInner}>
                <div className={styles.mealHeader}>
                    <div className={styles.timeLogic}>
                        <span>0:00</span>
                        <span>A + B</span>
                    </div>
                    <div className={styles.titleContainer}>
                        <span className={styles.mealTitle}>{title}</span>
                        <div className={styles.bar}>
                            <span className={styles.B_R}>B 0</span>
                            <span className={styles.A_B}>A 0</span>
                            <span className={styles.A_R}>R 0</span>
                        </div>
                    </div>
                    <IoIosArrowBack className={styles.icon}/>
                </div>
            </div>
        </div>
    );
};

export default Meal;