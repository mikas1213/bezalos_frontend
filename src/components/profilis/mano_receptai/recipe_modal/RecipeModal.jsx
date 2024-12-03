import styles from './RecipeModal.module.css';
import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Utensils, ChevronLeft } from 'lucide-react';
import Meal from './Meal';
import MakeRecipeForm from './MakeRecipeForm';

const RecipeModal = () => {
    // const ref = useRef(null);
    const { plans, prodList } = useOutletContext();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState({});
    const [selectedProds, setSelectedProds] = useState([]);
    
    const meals = plans.map(plan => plan.meals.filter(meal => !meal.is_sport).map(meal => ({
        id: meal.id, 
        title: meal.title,
        logic: meal.logic,
        b: meal.b,
        a: meal.a,
        r: meal.r,
        kcal: meal.kcal
    }))).flat();

    // useEffect(() => {
    //     const handleClickOutside = e => {
    //         if(ref.current && !ref.current.contains(e.target)) {
    //             setIsOpen(false);
    //         }
    //     };
    //     document.addEventListener('click', handleClickOutside);
    //     return () => document.removeEventListener('click', handleClickOutside);
    // }, []);
    
    return  (
        <div className={styles.recipeModal}>
            <div 
                className={`${styles.selectMeals} ${isOpen ? styles.open : ''}`} 
                onClick={() => { 
                    // e.stopPropagation(); 
                    setIsOpen(!isOpen);
                }}
            >
                {Object.keys(selectedMeal).length === 0 ? 
                    <><div className={styles.iconContainer}>
                            <Utensils className={styles.forkIcon}/>
                        </div>
                        <span className={styles.selectTitle}>Mano planų valgiai</span>
                    </> : 
                    <Meal meal={selectedMeal} />
                }
                <ChevronLeft className={styles.chevronIcon}/>
            </div>

            {isOpen && <div
                // ref={ref} 
                className={styles.userMeals}
            >
                {Object.keys(selectedMeal).length > 0 && <div 
                    className={styles.beValgio} 
                    onClick={() => setSelectedMeal({})}
                >
                    Be valgio
                </div>}

                {meals.map(meal => <Meal 
                    key={meal.id} 
                    meal={meal} 
                    setIsOpen={setIsOpen}
                    setSelectedMeal={setSelectedMeal}
                />)}
            </div>}

            <MakeRecipeForm prodList={prodList} selectedProds={selectedProds} setSelectedProds={setSelectedProds} />
            
        </div>
    );
};


export default RecipeModal;