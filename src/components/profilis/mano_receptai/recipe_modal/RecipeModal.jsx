import styles from './RecipeModal.module.css';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import UserMeals from './user_meals/UserMeals';
import NewRecipe from './new_recipe/NewRecipe';
import ActionBtns from './action_btns/ActionBtns';
import toast from 'react-hot-toast';
import Spinner from '../../../UI/Spinner';
import { isBarInRange } from '../../../../utils/calculationsHelpers';

const RecipeModal = ({ setOpen, setRecipes }) => {
    const { user_id, plans: userPlans, prodList } = useOutletContext();
    const [selectedMeal, setSelectedMeal] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [newRecipe, setNewRecipe] = useState({
        title: '',
        logic: '-',
        products: [],
        b: 0,
        a: 0,
        r: 0,
        kcal: 0
    });
    const is_bar_error = key => (Object.keys(selectedMeal).length === 0 || newRecipe.products.length === 0) || isBarInRange(newRecipe[key], selectedMeal[key], 5) ? false : true;

    const axiosPrivate = useAxiosPrivate();
    const saveNewRecipe = async () => {
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        const is_bar_good = !is_bar_error('b') && !is_bar_error('a') && !is_bar_error('r');

        try {
            const { data: { recipe_id } } = await axiosPrivate.post(`/profile/new-recipe/${user_id}`, newRecipe);
            if(!is_bar_good) {
                return toast.error('Naujas receptas neatitinka pasirinkto valgio maistinės vertės');
                
            }
            setIsLoading(true);
            await delay;
            toast.success('Receptas sėkmingai pridėtas!')
            setOpen(false);
            setIsLoading(false);
            setRecipes(prev => [
                {...newRecipe,  id: recipe_id, isNew: true},
                ...prev.map(recipe => ({...recipe, isNew: false})) 
            ]);
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
            <UserMeals userPlans={userPlans} selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal} setNewRecipe={setNewRecipe} />
            <NewRecipe prodList={prodList} selectedMeal={selectedMeal} newRecipe={newRecipe} setNewRecipe={setNewRecipe} is_bar_error={is_bar_error} />
            <ActionBtns setOpen={setOpen} newRecipe={newRecipe} saveNewRecipe={saveNewRecipe} isLoading={isLoading} />
        </div>
    );
};

export default RecipeModal;