import InformationSoon from '../../components/information_soon/InformationSoon';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Container from '../../components/UI/Container';
import Header from '../../components/profilis/mano_receptai/header/Header';
import NewRecipeBtn from '../../components/profilis/mano_receptai/header/NewRecipeBtn';
import LogicFilter from '../../components/profilis/mano_receptai/header/LogicFilter';
import SearchRecipe from '../../components/profilis/mano_receptai/header/SearchRecipe';
import RecipeModal from '../../components/profilis/mano_receptai/recipe_modal/RecipeModal';
import UserRecipe from '../../components/profilis/mano_receptai/user_recipes/UserRecipe';

const filterOptions = [
    {value: 'A+B', label: 'A+B', color: '#30c040'},
    {value: 'B+R', label: 'B+R', color: '#245D6B'},
    {value: 'A+R', label: 'A+R', color: '#ec9f11'}
];

const ManoReceptaiPage = () => {
    const { recipes, setRecipes } = useOutletContext();
    console.log('recipes: ', recipes)
    const [logicFilter, setLogicFilter] = useState('');
    const [open, setOpen] = useState(false);

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
        //         {open && <RecipeModal setOpen={setOpen} />}
        //     </Header>
        //     <UserRecipe recipe={recipes[0]} />
        // </Container>
        <InformationSoon />
    );
};

export default ManoReceptaiPage;