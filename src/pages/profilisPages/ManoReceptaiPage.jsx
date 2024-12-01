// import InformationSoon from '../../components/information_soon/InformationSoon';
import { useState } from 'react';
import Container from '../../components/UI/Container';
import Header from '../../components/profilis/mano_receptai/Header';
import NewRecipeBtn from '../../components/profilis/mano_receptai/ui/NewRecipeBtn';
import LogicFilter from '../../components/profilis/mano_receptai/ui/LogicFilter';
import SearchRecipe from '../../components/profilis/mano_receptai/ui/SearchRecipe';

const filterOptions = [
    {value: 'A+B', label: 'A+B', color: '#30c040'},
    {value: 'B+R', label: 'B+R', color: '#245D6B'},
    {value: 'A+R', label: 'A+R', color: '#ec9f11'}
];

const ManoReceptaiPage = () => {
    const [logicFilter, setLogicFilter] = useState('');
    console.log(logicFilter)
    return (
        <Container>
            <Header>
                <NewRecipeBtn />
                <LogicFilter 
                    options={filterOptions}
                    setFilter={logicFilter} 
                    onSetFilter={setLogicFilter}
                />
                <SearchRecipe />
            </Header>
        </Container>
    );
};

export default ManoReceptaiPage;