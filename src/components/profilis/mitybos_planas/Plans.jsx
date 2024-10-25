import styles from './Plans.module.css';
import { useState } from 'react';
import SelectPlan from './SelectPlan';
import Circle from './Circle';
import Meal from './Meal';
import Sport from './Sport';

/*
    auto: The default value, which lets the browser choose the most appropriate baseline1
    use-script: Aligns the text according to the script of the first character.
    no-change: Keeps the current alignment without any changes.
    central: Centers the text vertically.
    middle: Aligns the text to the middle of the text's height.
    alphabetic: Aligns the text to the alphabetic baseline (the baseline used for most letters).
    hanging: Aligns the text to the hanging baseline (used for characters like "j" or "g").
    text-before-edge: Aligns the text to the top of the text's height.
    text-after-edge: Aligns the text to the bottom of the text's height.
*/


const Plans = ({ plans, is_subscription }) => {
    const [selectedPlan, setSelectedPlan] = useState(plans[0]);
    return (
        <div className={styles.plans}>
            <div className={styles.overlay}></div>
            <div className={styles.planHeader}>

                <SelectPlan 
                    plans={plans} 
                    selectedPlan={selectedPlan} 
                    setSelectedPlan={setSelectedPlan} 
                />

                <Circle plan={selectedPlan} />

                <div className={styles.meals}>
                    {selectedPlan.meals.map(meal => !meal.is_sport ? <Meal 
                        key={meal.id}
                        meal={meal}
                        is_subscription={is_subscription}
                    /> : <Sport key={meal.id} meal={meal} />)}
                </div>
            </div>
        </div>
    );
};

export default Plans;