import styles from './Meal.module.css';
import { Flame } from 'lucide-react';

const Meal = ({ meal, setSelectedMeal, setIsOpen, className = '' }) => {
    
    return (
        <div className={`${styles.meal} ${styles[className]}`} onClick={() => {
            setSelectedMeal(meal);
            setIsOpen(false);
        }}>
            <div className={styles.mealTop}>
                <span className={styles.title}>{meal.title}</span>
                <span className={styles[meal.logic.replace('+', '_')]}>{meal.logic}</span>
            </div>
            
            <div className={styles.mealBottom}>
                <div className={styles.bar}>
                    <span className={styles.b}>B {meal.b}</span>
                    <span className={styles.a}>A {meal.a}</span>
                    <span className={styles.r}>R {meal.r}</span>
                </div>
                <div className={styles.kcal}>
                    <span className={styles.k}>
                        <Flame className={styles.kcalIcon}/>
                        {meal.kcal} kcal
                    </span>
                </div>
                
            </div>
        </div>
    );
};

export default Meal;