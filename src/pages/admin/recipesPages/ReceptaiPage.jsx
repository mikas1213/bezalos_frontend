import Header from '../../../components/admin/recipes/header/Header';
import CreateRecipeModal from '../../../components/admin/recipes/create_recipe/CreateRecipeModal';
import { usePlanProducts } from '../../../hooks/profile/usePlanProducts';
import useAdminRecipes from '../../../hooks/useAdminRecipes';
import AdminRecipes from '../../../components/admin/recipes/AdminRecipes';
import { useState } from 'react';

const ReceptaiPage = () => {
    const [open, setOpen] = useState(false);
    const prodList = usePlanProducts();
    const { isLoading, adminRecipes } = useAdminRecipes();
    
    const emptyRecipe = { 
        title: '',
        recipe_type: 'Pusryčiai',
        food_logic: 'A+B',
        taste: 'Aštru',
        duration: 5,
        is_vegetarian: false,
        products: [],
        description: '',
        video_link: '',
        b: 0,
        a: 0,
        r: 0,
        kcal: 0
    };

    const [newRecipe, setNewRecipe] = useState(emptyRecipe);

    const handleDeleteRecipe = () => {

    };

    return (
        <>
            <Header setOpen={setOpen} />
            {open && <CreateRecipeModal 
                prodList={prodList.prodList} 
                setOpen={setOpen} 
                emptyRecipe={emptyRecipe}
                newRecipe={newRecipe}
                setNewRecipe={setNewRecipe}
            />}
            {!isLoading && adminRecipes.length > 0 && <AdminRecipes adminRecipes={adminRecipes} />}
        </>
    );
};

export default ReceptaiPage;