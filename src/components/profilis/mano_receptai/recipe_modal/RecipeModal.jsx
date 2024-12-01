import styles from './RecipeModal.module.css';
import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Utensils, ChevronLeft } from 'lucide-react';
import Meal from './Meal';

const RecipeModal = () => {
    const { plans, prodList } = useOutletContext();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    
    const meals = plans.map(plan => plan.meals.filter(meal => !meal.is_sport).map(meal => ({
        id: meal.id, 
        title: meal.title,
        logic: meal.logic,
        b: meal.b,
        a: meal.a,
        r: meal.r,
        kcal: meal.kcal
    }))).flat();

    useEffect(() => {
        const handleClickOutside = e => {
              
            if(ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);
    
    return  (
        <div className={styles.recipeModal}>
            <div 
                className={`${styles.selectMeals} ${isOpen ? styles.open : ''}`} 
                onClick={(e) => { 
                    e.stopPropagation(); 
                    setIsOpen(!isOpen);
                }}
            >
                <div className={styles.iconContainer}>
                    <Utensils className={styles.forkIcon}/>
                </div>
                
                <span className={styles.selectTitle}>Tavo valgiai</span>
                <ChevronLeft className={styles.chevronIcon}/>
            </div>

            {isOpen && <div ref={ref} className={styles.userMeals}>
                {meals.map(meal => <Meal key={meal.id} meal={meal} />)}
            </div>}
        </div>
    );
};


export default RecipeModal;