import styles from './RecipeModal.module.css';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import UserMeals from './user_meals/UserMeals';
import NewRecipe from './new_recipe/NewRecipe';
import ActionBtns from './action_btns/ActionBtns';
import toast from 'react-hot-toast';
import Spinner from '../../../UI/Spinner';

const RecipeModal = ({ setOpen }) => {
    const { user_id, plans: userPlans, prodList } = useOutletContext();
    const [selectedMeal, setSelectedMeal] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [newRecipe, setNewRecipe] = useState({
        title: '',
        products: [],
        b: 0,
        a: 0,
        r: 0,
        kcal: 0
    });

    const axiosPrivate = useAxiosPrivate();
    const saveNewRecipe = async () => {
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            await axiosPrivate.post(`/profile/new-recipe/${user_id}`, newRecipe);
            setIsLoading(true);
            await delay;
            toast.success('Receptas sėkmingai pridėtas!')
            setOpen(false);
            setIsLoading(false);
            
        } catch (err) {
            if(err.status === 400) {
                toast.error(err.response.data.message);
                
            } else {
                toast.error('Tikriausia serverio klaida.\nBandykite vėliau')
            }
        } finally {
            setIsLoading(false);
        }
    };

    return  (
        <div className={styles.recipeModal}>
            {isLoading && <Spinner />}
            <UserMeals userPlans={userPlans} selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal} />
            <NewRecipe prodList={prodList} selectedMeal={selectedMeal} newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            <ActionBtns setOpen={setOpen} newRecipe={newRecipe} saveNewRecipe={saveNewRecipe} isLoading={isLoading} />
        </div>
    );
};

export default RecipeModal;