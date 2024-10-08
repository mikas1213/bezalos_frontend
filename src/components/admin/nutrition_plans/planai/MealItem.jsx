import styles from './MealItem.module.css';
import { kcal } from '../../../../utils/calculationsHelpers';

const MealItem = ({ meal }) => {
    
    return (
        <div className={styles.mealItem} draggable={false}>
            <div className={styles.header}>
                <span>{meal.title}</span>
                <span className={styles[meal.logic.replace('+', '_')]}>{meal.logic}</span>
            </div>
            <div className={styles.bar}>
                <span className={styles.B_R_}>B {meal.b.toFixed(0)}</span>
                <span className={styles.A_B_}>A {meal.a.toFixed(0)}</span>
                <span className={styles.A_R_}>R {meal.r.toFixed(0)}</span>
                <span className={styles.kcal}>Kcal {kcal(meal.b, meal.a, meal.r).toFixed(0)}</span>
            </div>
        </div>
    );
};

export default MealItem;


export const SportItem = ({ sport }) => {
    return (
        <div className={styles.sportItem}>
            <span>Sportas</span>
            <span>{sport.meal_time_from}</span>
        </div>
    );
};