import styles from './Meal.module.css';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Products from './Products';

const Meal = ({ meal, is_subscription, onChangeProduct, setIsShowChageProdList, setClickedProd, clickedProd }) => {
    const [isShowProd, setIsShowProd] = useState(false);
    return (
        <div className={`${styles.meal} ${styles[meal.logic?.replace('+', '_')]} ${isShowProd ? styles.show : ''}`}>
            <div className={styles.mealInner} onClick={() => {setIsShowProd(on => !on); setIsShowChageProdList(false)}}>
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
                            <span>Kcal {meal.kcal}</span>
                        </div>
                    </div>
                    <IoIosArrowBack className={styles.icon}/>
                </div>
            </div>

            <Products 
                isShowProd={isShowProd} 
                meal={meal} 
                onChangeProduct={onChangeProduct}
                is_subscription={is_subscription} 
                setClickedProd={setClickedProd}
                clickedProd={clickedProd}
            />
        </div>
    );
};

export default Meal;