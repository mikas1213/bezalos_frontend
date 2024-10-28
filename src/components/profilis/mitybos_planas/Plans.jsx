import styles from './Plans.module.css';
import SelectPlan from './SelectPlan';
import Circle from './Circle';
import Meal from './Meal';
import Sport from './Sport';
import ChangeProductList from './ChangeProductList';
import InfoSubscribe from './InfoSubscribe';

const Plans = ({ plans, selectedPlan, setSelectedPlan, is_subscription, onChangeProduct, onUpdateProduct, topPosition, isShowChageProdList, setIsShowChageProdList, setClickedProd, clickedProd, filteredProducts }) => {

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
            {is_subscription ? isShowChageProdList && <ChangeProductList 
                key={Date.now()} 
                top={topPosition} 
                onUpdateProduct={onUpdateProduct}
                setIsShowChageProdList={setIsShowChageProdList}
                filteredProducts={filteredProducts} 
            /> : isShowChageProdList && <InfoSubscribe setIsShowChageProdList={setIsShowChageProdList} />
            }
        </div>
    );
};

export default Plans;