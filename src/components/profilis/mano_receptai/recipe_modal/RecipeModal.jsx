import { useState } from 'react';
import toast from 'react-hot-toast';

import { useCreateRecipe } from '../../../../features/client/profilis/hooks/useCreateRecipe';
import { useProducts } from '../../../../features/client/profilis/hooks/useProducts';
import { useProfile } from '../../../../features/client/profilis/hooks/useProfile';
import { useProfilisContext } from '../../../../features/client/profilis/hooks/useProfilisContext';
import { isBarInRange } from '../../../../utils/calculationsHelpers';
import Spinner from '../../../UI/Spinner';

import ActionBtns from './action_btns/ActionBtns';
import NewRecipe from './new_recipe/NewRecipe';
import UserMeals from './user_meals/UserMeals';

import styles from './RecipeModal.module.css';

/** @typedef {import('../../../../features/client/profilis/types').Product & { product_id: string; id: string; grams: number | string }} NewRecipeProduct */
/** @typedef {{ title: string; logic: import('../../../../features/client/profilis/types').FoodLogic; products: NewRecipeProduct[]; b: number; a: number; r: number; kcal: number }} NewRecipeState */

/** @param {{ setOpen: (open: boolean) => void; onCreated: (recipeId: string) => void }} props */
const RecipeModal = ({ setOpen, onCreated }) => {
    const { userId } = useProfilisContext();
    const { plans: userPlans } = useProfile(userId);
    const { products: prodList } = useProducts();
    const createRecipe = useCreateRecipe(userId);
    const [selectedMeal, setSelectedMeal] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [newRecipe, setNewRecipe] = useState(/** @type {NewRecipeState} */ ({
        title: '',
        logic: '-',
        products: [],
        b: 0,
        a: 0,
        r: 0,
        kcal: 0
    }));
    /** @param {'b' | 'a' | 'r'} key */
    const is_bar_error = key => (Object.keys(selectedMeal).length === 0 || newRecipe.products.length === 0) || isBarInRange(newRecipe[key], selectedMeal[key], 5) ? false : true;


    const saveNewRecipe = async () => {
        const is_bar_good = !is_bar_error('b') && !is_bar_error('a') && !is_bar_error('r');
        if(!is_bar_good) {
            return toast.error('Naujas receptas neatitinka pasirinkto valgio maistinės vertės');
        }

        // Bent sekundę rodomas spinneris, kaip ir anksčiau. Klaidų toast'us rodo useCreateRecipe.onError.
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(true);
        try {
            const { recipe_id } = await createRecipe.mutateAsync({
                title: newRecipe.title,
                logic: newRecipe.logic,
                b: newRecipe.b,
                a: newRecipe.a,
                r: newRecipe.r,
                kcal: newRecipe.kcal,
                products: newRecipe.products.map(({ id, product_id, title, proteins, carbs, fat, grams }) => ({
                    id, product_id, title, proteins, carbs, fat, grams: Number(grams) || 0,
                })),
            });
            await delay;
            toast.success('Receptas sėkmingai pridėtas!');
            setOpen(false);
            onCreated(recipe_id);
        } catch {
            // Klaida jau parodyta hook'e, modalas lieka atidarytas.
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