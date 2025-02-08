import { useState } from 'react';

// import InformationSoon from '../../components/information_soon/InformationSoon';
import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import RecipesHeader from '../../components/receptai/filters/RecipesHeader';
import Filters from '../../components/receptai/filters/Filters';
import InfoTab from '../../components/receptai/InfoTab';
import Recipes from '../../components/receptai/receptai/Recipes';
import FavoriteRecipes from '../../components/receptai/receptai/FavoriteRecipes';
import Pagination from '../../components/UI/Pagination';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useRecipes } from '../../hooks/recipes/useRecipes';

const RecipesPage = () => {
    const mediaQuery = useMediaQuery();
    const [isOpenFilters, setIsOpenFilters] = useState(false);

    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState('');
    
    const { isLoading, recipes, currentPage, setCurrentPage, totalPages, totalRows } = useRecipes({
        ...filters, 
        ...(search !== '' ? {search} : {})
    });
    
    return (
        <>
            <Navbar isHome='recipes' />
            <RecipesHeader 
                isOpenFilters={isOpenFilters} 
                setIsOpenFilters={setIsOpenFilters} 
                search={search}
                setSearch={setSearch}
            />
            
            <Main page='recipes'>
                {/* <InformationSoon /> */}
                <Container>
                    <FavoriteRecipes favoriteRecipes={recipes} />
                    <Filters 
                        isOpenFilters={isOpenFilters} 
                        mediaQuery={mediaQuery}
                        filters={filters} 
                        setFilters={setFilters}
                    />

                    {!isLoading && <>
                        <InfoTab recipesCount={totalRows} />

                        <Recipes recipes={recipes} />
                        
                        {totalPages > 0 && <Pagination 
                            setCurrentPage={setCurrentPage} 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            pagesLimit={mediaQuery < 441 ? 3 : 5}  
                        />}
                    </>}
                    
                </Container>
            </Main>
        </>
    );
};

export default RecipesPage;