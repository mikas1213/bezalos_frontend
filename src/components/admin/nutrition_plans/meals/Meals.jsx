import styles from './Meals.module.css';
import Meal from './Meal';

const Meals = ({ 
    meals, 
    handleMealUpdate, 
    handleMealDelete, 
    handleMealProductEdit, 
    handleMealProductGramsEdit 
}) => {
     
    return (
        <div className={styles.meals}>
            {meals.map(meal => <Meal 
                key={meal.id} 
                meal={meal} 
                handleMealUpdate={handleMealUpdate} 
                handleMealDelete={handleMealDelete}
                handleMealProductEdit={handleMealProductEdit}
                handleMealProductGramsEdit={handleMealProductGramsEdit}
            />)}
        </div>
    );
};

export default Meals;