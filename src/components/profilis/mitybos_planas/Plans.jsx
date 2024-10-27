import styles from './Plans.module.css';
import { useState } from 'react';
import SelectPlan from './SelectPlan';
import Circle from './Circle';
import Meal from './Meal';
import Sport from './Sport';

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