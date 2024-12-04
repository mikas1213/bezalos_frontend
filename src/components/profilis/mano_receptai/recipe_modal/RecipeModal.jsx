import styles from './RecipeModal.module.css';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import UserMeals from './user_meals/Usermeals';
import NewRecipe from './new_recipe/NewRecipe';
import ActionBtns from './action_btns/ActionBtns';

const RecipeModal = ({ setOpen }) => {
    const { plans: userPlans, prodList } = useOutletContext();
    const [selectedMeal, setSelectedMeal] = useState({});
    const [newRecipe, setNewRecipe] = useState({
        products: []
    });
    
    return  (
        <div className={styles.recipeModal}>
            <UserMeals userPlans={userPlans} selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal} />
            <NewRecipe prodList={prodList} newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            <ActionBtns setOpen={setOpen} />
        </div>
    );
};


export default RecipeModal;