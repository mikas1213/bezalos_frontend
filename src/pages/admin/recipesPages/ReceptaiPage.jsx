import Header from '../../../components/admin/recipes/header/Header';
import CreateRecipeModal from '../../../components/admin/recipes/create_recipe/CreateRecipeModal';
import { usePlanProducts } from '../../../hooks/profile/usePlanProducts';
import useAdminRecipes from '../../../hooks/useAdminRecipes';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import AdminRecipes from '../../../components/admin/recipes/AdminRecipes';
import Pagination from '../../../components/UI/Pagination';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ReceptaiPage = () => {
    const [open, setOpen] = useState(false);
    const prodList = usePlanProducts();
    const { isLoading, adminRecipes, setAdminRecipes, currentPage, setCurrentPage, totalPages } = useAdminRecipes();
    const axiosPrivate = useAxiosPrivate();

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

    const handleDeleteRecipe = async id => {
        try {
            const is_confirm_delete = confirm('Trinti receptą?');
            if(is_confirm_delete) {
                await axiosPrivate.delete(`/admin/recipes/${id}`);
                setAdminRecipes(prev => prev.filter(recipe => recipe.id !== id));
                toast.success('Receptas ištirntas');
            }
        } catch(err) {
            toast.error(err.response.data.message || err.message || 'Serverio klaida');
        }
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
                setAdminRecipes={setAdminRecipes}
            />}
            {!isLoading && adminRecipes.length > 0 && <AdminRecipes adminRecipes={adminRecipes} handleDeleteRecipe={handleDeleteRecipe} />}
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} pagesLimit={8} />
            {/* setCurrentPage, currentPage, totalPages, pagesLimit */}
        </>
    );
};

export default ReceptaiPage;