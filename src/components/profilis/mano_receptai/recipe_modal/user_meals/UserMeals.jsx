import styles from './UserMeals.module.css';
import { useState } from 'react';
import { Utensils, ChevronLeft } from 'lucide-react';
import Meal from './Meal';

const UserMeals = ({ userPlans, selectedMeal, setSelectedMeal, setNewRecipe }) => {
    const [isOpen, setIsOpen] = useState(false);
    const meals = userPlans.map(plan => plan.meals.filter(meal => !meal.is_sport).map(meal => ({
        id: meal.id, 
        title: meal.title,
        logic: meal.logic,
        b: meal.b,
        a: meal.a,
        r: meal.r,
        kcal: meal.kcal
    }))).flat();

    return (
        <>
            <div 
                className={`${styles.selectMeals} ${isOpen ? styles.open + ' open' : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
            >
                {Object.keys(selectedMeal).length === 0 ? 
                    <>
                        <div className={styles.forkIconContainer}>
                            <Utensils className={styles.forkIcon}/>
                        </div>
                        <span className={styles.selectTitle}>Mano planų valgiai</span>
                    </> : 
                    <Meal meal={selectedMeal} className='selectedMeal' />
                }
                <ChevronLeft className={styles.chevronIcon}/>
            </div>

            {isOpen && <div className={styles.mealsList}>
                {Object.keys(selectedMeal).length> 0 && <div 
                    className={styles.beValgio} 
                    onClick={() => {
                        setIsOpen(false);
                        setSelectedMeal({});
                        setNewRecipe(prev => ({ ...prev, logic: '-', is_bar_good: true}))
                    }}
                >Be valgio</div>}

                {meals.map(meal => <Meal 
                    key={meal.id} 
                    meal={meal} 
                    setNewRecipe={setNewRecipe}
                    setIsOpen={setIsOpen}
                    setSelectedMeal={setSelectedMeal}
                />)}
            </div>}
        </>
    );
};

export default UserMeals;