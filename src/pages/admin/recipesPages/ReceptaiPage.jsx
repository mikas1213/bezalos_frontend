import Header from '../../../components/admin/recipes/header/Header';
import CreateRecipeModal from '../../../components/admin/recipes/create_recipe/CreateRecipeModal';
import { usePlanProducts } from '../../../hooks/profile/usePlanProducts';
import useAdminRecipes from '../../../hooks/useAdminRecipes';
import { axiosPrivate } from '../../../api/axios';
import AdminRecipes from '../../../components/admin/recipes/AdminRecipes';
import Pagination from '../../../components/UI/Pagination';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ReceptaiPage = () => {

    const [modalControl, setModalControl] = useState({isOpen: false, action: ''});
    const [filters, setFilters] = useState({ search: ''});
    const [isLoadingOnSaveRecipe, setIsLoadingOnSaveRecipe] = useState(false);
    const { prodList } = usePlanProducts();
    const { isLoading, adminRecipes, setAdminRecipes, currentPage, setCurrentPage, totalPages } = useAdminRecipes(filters);
    
    const emptyRecipe = { 
        title: '',
        title_short: '',
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
    
    const handleNewRecipe = async () => {
        const delay = new Promise((resolve) => setTimeout(resolve, 200));
        try {
            setIsLoadingOnSaveRecipe(true);
            const formData = new FormData();
            formData.append('title', newRecipe.title);
            formData.append('title_short', newRecipe.title_short);
            formData.append('recipe_type', newRecipe.recipe_type);
            formData.append('food_logic', newRecipe.food_logic);
            formData.append('taste', newRecipe.taste);
            formData.append('duration', newRecipe.duration);
            formData.append('is_vegetarian', newRecipe.is_vegetarian);
            formData.append('products', JSON.stringify(newRecipe.products));
            formData.append('description', newRecipe.description);
            formData.append('video_link', newRecipe.video_link);
            formData.append('photo', newRecipe.photo);

            const { data: {recipe_id: id, recipe_slug: slug}} = await axiosPrivate.post('/admin/recipes/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            await delay;
            toast.success('Receptas sėkmingai pridėtas!')
            setModalControl({isOpen:false, action: ''});
            setAdminRecipes(prev => [{...newRecipe, id, slug}, ...prev]);
            setNewRecipe(emptyRecipe);

        } catch (err) {
            if(err.status === 400) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Tikriausia serverio klaida.\nBandykite vėliau')
            }
        } finally {
            setIsLoadingOnSaveRecipe(false);
        }
    };

    const handleEditRecipe = async id => {
        
        try {
            setIsLoadingOnSaveRecipe(true);
            const formData = new FormData();
            formData.append('title', newRecipe.title);
            formData.append('title_short', newRecipe.title_short);
            formData.append('recipe_type', newRecipe.recipe_type);
            formData.append('food_logic', newRecipe.food_logic);
            formData.append('taste', newRecipe.taste);
            formData.append('duration', newRecipe.duration);
            formData.append('is_vegetarian', newRecipe.is_vegetarian);
            formData.append('products', JSON.stringify(newRecipe.products));
            formData.append('description', newRecipe.description);
            formData.append('video_link', newRecipe.video_link);
            newRecipe.photo && formData.append('photo', newRecipe.photo);

            const {data: {isFileExist, slug}} = await axiosPrivate.patch(`/admin/recipes/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setAdminRecipes(prevState => prevState.map(recipe => recipe.id === newRecipe.id ? {
                ...newRecipe, slug
            } : recipe));
            
            setModalControl({isOpen:false, action: ''});
            toast.success('Receptas atnaujintas.');
            if(!isFileExist) toast.success('⚠️ Bet S3 failo nebuvo ⚠️');
            
            setNewRecipe(emptyRecipe);
        } catch(err) {
            toast.error(err.response.data.message || err.message)
        } finally {
            setIsLoadingOnSaveRecipe(false);
        }
    };

    const handleDeleteRecipe = async (id, slug) => {
        try {
            const is_confirm_delete = confirm('Trinti receptą?');
            if(is_confirm_delete) {
                const {data: isExistFile} = await axiosPrivate.delete(`/admin/recipes/${id}`, {data: {slug}});
                setAdminRecipes(prev => prev.filter(recipe => recipe.id !== id));
                
                toast.success('Receptas ištirntas');
                if(!isExistFile) toast.success('⚠️ Bet S3 failo nebuvo ⚠️');
            }
        } catch(err) {
            toast.error(err.response.data.message || err.message || 'Serverio klaida');
        }
    };

    return (
        <>
            <Header 
                setModalControl={setModalControl} 
                filters={filters} 
                setFilters={setFilters}
            />
            {modalControl.isOpen && <CreateRecipeModal 
                isLoading={isLoadingOnSaveRecipe}
                prodList={prodList} 
                modalControl={modalControl}
                setModalControl={setModalControl} 
                emptyRecipe={emptyRecipe}
                newRecipe={newRecipe}
                handleNewRecipe={handleNewRecipe}
                handleEditRecipe={handleEditRecipe}
                setNewRecipe={setNewRecipe}
                setAdminRecipes={setAdminRecipes}
            />}

            {!isLoading && adminRecipes.length > 0 && <AdminRecipes 
                adminRecipes={adminRecipes} 
                handleDeleteRecipe={handleDeleteRecipe} 
                setModalControl={setModalControl} 
                setNewRecipe={setNewRecipe}
            />}

            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} pagesLimit={8} />
        </>
    );
};

export default ReceptaiPage;