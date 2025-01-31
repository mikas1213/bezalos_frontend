import InformationSoon from '../components/information_soon/InformationSoon';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import Main from '../components/UI/Main';
import Container from '../components/UI/Container';
import RecipesHeader from '../components/receptai/filters/RecipesHeader';
import Filters from '../components/receptai/filters/Filters';
import Recipes from '../components/receptai/receptai/Recipes';

const ReceptaiPage = () => {
    
    
    const [isOpenFilters, setIsOpenFilters] = useState(false);
    const [mediaQuery, setMediaQuery] = useState(0);

    useEffect(() => {
        const query_576 = window.matchMedia('(max-width: 576px)');
        const query_440 = window.matchMedia('(max-width: 440px)');
        const query_375 = window.matchMedia('(max-width: 375px)');

        const applyMediaQuery = () => {
            if(query_375.matches) {
                setMediaQuery(375);
            } else if(query_440.matches) {
                setMediaQuery(440);
            } else if(query_576.matches) {
                setMediaQuery(576);
            } else {
                setMediaQuery(0);
            }
        };
        query_576.addEventListener('change', applyMediaQuery);
        query_440.addEventListener('change', applyMediaQuery);
        query_375.addEventListener('change', applyMediaQuery);
        applyMediaQuery();
        document.body.style.backgroundColor = '#fff';
        document.title = 'Be žalos | Receptai';

        return () => {
            query_576.removeEventListener('change', applyMediaQuery);
            query_440.removeEventListener('change', applyMediaQuery);
            query_375.removeEventListener('change', applyMediaQuery);
        };
    }, []);
    
    return (
        <>
            <Navbar isHome='recipes' />
            {/* <RecipesHeader isOpenFilters={isOpenFilters} setIsOpenFilters={setIsOpenFilters} /> */}
            <Main page='recipes'>
                <InformationSoon />
                {/* <Container>
                    <Filters isOpenFilters={isOpenFilters} />
                    <Recipes />
                </Container> */}
            </Main>
        </>
    );
};

export default ReceptaiPage;