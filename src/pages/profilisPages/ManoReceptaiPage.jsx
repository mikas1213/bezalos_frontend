import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Container from '../../components/UI/Container';
import Header from '../../components/profilis/mano_receptai/header/Header';
import NewRecipeBtn from '../../components/profilis/mano_receptai/header/NewRecipeBtn';
import LogicFilter from '../../components/profilis/mano_receptai/header/LogicFilter';
import SearchRecipe from '../../components/profilis/mano_receptai/header/SearchRecipe';
import RecipeModal from '../../components/profilis/mano_receptai/recipe_modal/RecipeModal';
import RecipeList from '../../components/profilis/mano_receptai/user_recipes/RecipeList';
import Pagination from '../../components/UI/Pagination';
import No_recipes from '../../components/profilis/mano_receptai/No_recipes';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';

const filterOptions = [
    {value: 'A+B', label: 'A+B', color: '#30c040'},
    {value: 'B+R', label: 'B+R', color: '#245D6B'},
    {value: 'A+R', label: 'A+R', color: '#ec9f11'}
];

const ManoReceptaiPage = () => {
    const { 
        isLoading,
        is_subscription,
        setRecipes,
        logicFilter,
        setLogicFilter,
        searchRecipe,
        setSearchRecipe,
        /* PAGINATION RETURNS */
        currentPage,
        totalPages,
        paginatedRecipes,
        setPaginatedRecipes,
        setCurrentPage
    } = useOutletContext();
    
    const axiosPrivate = useAxiosPrivate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setPaginatedRecipes(prev => 
            prev.map(prev => ({...prev, isNew: false}))
        );
    }, [setPaginatedRecipes, setCurrentPage]);


    const handleDeleteRecipe = async (recipe_id) => {
        try {
            await axiosPrivate.delete(`/profile/new-recipe/${recipe_id}`);
            await new Promise(resolve => setTimeout(resolve, 500));
            setRecipes(prev => prev.filter(recipe => recipe.id !== recipe_id));
        } catch (err) {
            toast.error(err.response.data.message || err.message)
        }
    };

    return (
        <>
        {isLoading ? null : is_subscription ? <Container>
            <Header>
                <NewRecipeBtn setOpen={setOpen} />
                <LogicFilter 
                    options={filterOptions}
                    setFilter={logicFilter} 
                    onSetFilter={setLogicFilter}
                    setCurrentPage={setCurrentPage}
                />
                <SearchRecipe searchRecipe={searchRecipe} setSearchRecipe={setSearchRecipe} />
                {open && <RecipeModal setOpen={setOpen} setRecipes={setRecipes} />}
            </Header>
            <RecipeList recipes={paginatedRecipes} handleDeleteRecipe={handleDeleteRecipe} />
            {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage } setCurrentPage={setCurrentPage} pagesLimit={5} color='var(--color-btn-secondary)' />}

        </Container> :
        <Container>
            <No_recipes />
        </Container>}
        </>
    );
};

export default ManoReceptaiPage;