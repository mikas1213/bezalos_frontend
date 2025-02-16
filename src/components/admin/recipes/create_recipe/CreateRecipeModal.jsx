import styles from './CreateRecipeModal.module.css';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import NewRecipe from './new_recipe/NewRecipe';
import ActionBtns from './action_btns/ActionBtns';
import Spinner from '../../../UI/Spinner';

import { useState } from 'react';
import toast from 'react-hot-toast';

const CreateRecipeModal = ({ setOpen, prodList, newRecipe, setNewRecipe, setAdminRecipes, emptyRecipe }) => {
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    
    const saveNewRecipe = async () => {
        const delay = new Promise((resolve) => setTimeout(resolve, 200));
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('title', newRecipe.title);
            formData.append('recipe_type', newRecipe.recipe_type);
            formData.append('food_logic', newRecipe.food_logic);
            formData.append('taste', newRecipe.taste);
            formData.append('duration', newRecipe.duration);
            formData.append('is_vegetarian', newRecipe.is_vegetarian);
            formData.append('products', JSON.stringify(newRecipe.products));
            formData.append('description', newRecipe.description);
            formData.append('video_link', newRecipe.video_link);
            formData.append('photo', newRecipe.photo);

            // const { data: { recipe_id } } = 
            const {data: id} = await axiosPrivate.post('/recipes/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            await delay;
            toast.success('Receptas sėkmingai pridėtas!')
            setOpen(false);
            setAdminRecipes(prev => [{...newRecipe, id}, ...prev]);

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
            <NewRecipe prodList={prodList} newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            <ActionBtns 
                setOpen={setOpen} 
                emptyRecipe={emptyRecipe}
                newRecipe={newRecipe} 
                saveNewRecipe={saveNewRecipe} 
                setNewRecipe={setNewRecipe}
                isLoading={isLoading} 
            />
        </div>
    );
};

export default CreateRecipeModal;