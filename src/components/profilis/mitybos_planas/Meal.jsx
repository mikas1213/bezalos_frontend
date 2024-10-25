import styles from './Meal.module.css';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Products from './Products';

const Meal = ({ meal, is_subscription }) => {
    const [isShowProd, setIsShowProd] = useState(false);
    return (
        <div className={`${styles.meal} ${styles[meal.logic?.replace('+', '_')]} ${isShowProd ? styles.show : ''}`}>
            <div className={styles.mealInner} onClick={() => setIsShowProd(on => !on)}>
                <div className={styles.mealHeader}>
                    <div className={styles.timeLogic}>
                        <span>{meal.meal_time}</span>
                        <span>{meal.logic}</span>
                    </div>
                    <div className={styles.titleContainer}>
                        <span className={styles.mealTitle}>{meal.title}</span>
                        <div className={styles.bar}>
                            <span>B {meal.b}</span>
                            <span>A {meal.a}</span>
                            <span>R {meal.r}</span>
                        </div>
                    </div>
                    <IoIosArrowBack className={styles.icon}/>
                </div>
            </div>

            <Products isShowProd={isShowProd} meal={meal} is_subscription={is_subscription} />
        </div>
    );
};

export default Meal;