import InformationSoon from '../components/information_soon/InformationSoon';
import { useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import Main from '../components/UI/Main';
import Container from '../components/UI/Container';
import RecipesHeader from '../components/receptai/filters/RecipesHeader';
import Filters from '../components/receptai/filters/Filters';
import Recipes from '../components/receptai/receptai/Recipes';

const ReceptaiPage = () => {
    
    useEffect(() => {
        document.body.style.backgroundColor = '#fff';
        document.title = 'Be žalos | Receptai';
    }, []);

    return (
        <>
            <Navbar isHome='recipes' />
            {/* <RecipesHeader /> */}
            <Main page='recipes'>
                <InformationSoon />
                {/* <Container>
                    <Filters />
                    <Recipes />
                </Container> */}
            </Main>
        </>
    );
};

export default ReceptaiPage;