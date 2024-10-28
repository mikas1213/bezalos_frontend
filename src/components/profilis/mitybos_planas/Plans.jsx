import styles from './Plans.module.css';
import { useState } from 'react';
import SelectPlan from './SelectPlan';
import Circle from './Circle';
import Meal from './Meal';
import Sport from './Sport';
import ChangeProductList from './ChangeProductList';

const Plans = ({ plans, is_subscription, onChangeProduct, topPosition, isShowChageProdList, setIsShowChageProdList, setClickedProd, clickedProd, filteredProducts }) => {
    const [selectedPlan, setSelectedPlan] = useState(plans[0]);

    return (
        <div className={styles.plans}>
            <div className={styles.planHeader}>
                <div className={styles.overlay}></div>
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
                        onChangeProduct={onChangeProduct}
                        setIsShowChageProdList={setIsShowChageProdList}
                        setClickedProd={setClickedProd}
                        clickedProd={clickedProd}
                    /> : <Sport key={meal.id} meal={meal} />)}
                </div>
            </div>
            {isShowChageProdList && <ChangeProductList key={Date.now()} top={topPosition} filteredProducts={filteredProducts} />}
        </div>
    );
};

export default Plans;