import styles from './Meals.module.css';
import Meal from './Meal';

const Meals = ({ 
    meals, 
    handleMealUpdate, 
    handleMealDelete,
    handleMealProductAdd,
    handleMealProductEdit,
    handleMealProductDelete
}) => {
     
    return (
        <div className={styles.meals}>
            {meals.map(meal => <Meal 
                key={meal.id} 
                meal={meal} 
                handleMealUpdate={handleMealUpdate} 
                handleMealDelete={handleMealDelete}
                handleMealProductAdd={handleMealProductAdd}
                handleMealProductEdit={handleMealProductEdit}
                handleMealProductDelete={handleMealProductDelete}
            />)}
        </div>
    );
};

export default Meals;