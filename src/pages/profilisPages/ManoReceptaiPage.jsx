import InformationSoon from '../../components/information_soon/InformationSoon';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Container from '../../components/UI/Container';
import Header from '../../components/profilis/mano_receptai/header/Header';
import NewRecipeBtn from '../../components/profilis/mano_receptai/header/NewRecipeBtn';
import LogicFilter from '../../components/profilis/mano_receptai/header/LogicFilter';
import SearchRecipe from '../../components/profilis/mano_receptai/header/SearchRecipe';
import RecipeModal from '../../components/profilis/mano_receptai/recipe_modal/RecipeModal';
import RecipeList from '../../components/profilis/mano_receptai/user_recipes/RecipeList';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';

const filterOptions = [
    {value: 'A+B', label: 'A+B', color: '#30c040'},
    {value: 'B+R', label: 'B+R', color: '#245D6B'},
    {value: 'A+R', label: 'A+R', color: '#ec9f11'}
];

const ManoReceptaiPage = () => {
    const { recipes, setRecipes } = useOutletContext();
    const axiosPrivate = useAxiosPrivate();

    const [logicFilter, setLogicFilter] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setRecipes(prev => [
            ...prev.map(recipe => ({...recipe, isNew: false})) 
        ]);
    }, [setRecipes]);

    const handleDeleteRecipe = async (recipe_id) => {
        try {
            await axiosPrivate.delete(`/profile/new-recipe/${recipe_id}`);
            await new Promise(resolve => setTimeout(resolve, 500));
            setRecipes(prev => prev.filter(recipe => recipe.id !== recipe_id));
        } catch (err) {
            toast.error(err.message)
        }
    };

    return (
        // <Container>
        //     <Header>
        //         <NewRecipeBtn setOpen={setOpen} />
        //         <LogicFilter 
        //             options={filterOptions}
        //             setFilter={logicFilter} 
        //             onSetFilter={setLogicFilter}
        //         />
        //         <SearchRecipe />
        //         {open && <RecipeModal setOpen={setOpen} setRecipes={setRecipes} />}
        //     </Header>
        //     <RecipeList recipes={recipes} handleDeleteRecipe={handleDeleteRecipe} />
        // </Container>
        <InformationSoon />
    );
};

export default ManoReceptaiPage;