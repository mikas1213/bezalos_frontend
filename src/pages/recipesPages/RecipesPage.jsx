import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import RecipesHeader from '../../components/receptai/filters/RecipesHeader';
import Filters from '../../components/receptai/filters/Filters';
import InfoTab from '../../components/receptai/InfoTab';
import Recipes from '../../components/receptai/receptai/Recipes';
import FavoriteRecipes from '../../components/receptai/receptai/FavoriteRecipes';
import Pagination from '../../components/UI/Pagination';
import Footer from '../../components/UI/Footer';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useRecipes } from '../../hooks/recipes/useRecipes';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const RecipesPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const mediaQuery = useMediaQuery();
    const [isOpenFilters, setIsOpenFilters] = useState(false);

    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState('');
    const user_id = useAuth()?.loggedUser?.user_id || null;
    const { setIsOpenModal } = useAuth();
 
    const { isLoading, recipes, mostLiked, setRecipes, currentPage, setCurrentPage, totalPages, totalRows } = useRecipes({
        ...filters, 
        ...(search !== '' ? {search} : {})
    }, user_id);
    
    const onToggleLikes = async (recipe_id) => {
        if(!user_id) {
            setIsOpenModal(true);
        } else {
            const like = await axiosPrivate.post(`/likes/recipe`, {user_id, entity_id: recipe_id, type: 'likes_recipes'}); 
            
            setRecipes(prevState => prevState.map(recipe => recipe.id === recipe_id ? {
                ...recipe,
                liked: like.data.isLiked,
                likes: like.data.likesCount
            } : recipe));
        }
    };
    
    return (
        <>
            <Navbar isHome='recipes' />
            <RecipesHeader 
                isOpenFilters={isOpenFilters} 
                setIsOpenFilters={setIsOpenFilters} 
                search={search}
                setSearch={setSearch}
                setCurrentPage={setCurrentPage}
            />
            
            <Main page='recipes'>
                <Container>
                    <FavoriteRecipes mostLiked={mostLiked} />
                    <Filters isOpenFilters={isOpenFilters} mediaQuery={mediaQuery} filters={filters} setFilters={setFilters} setCurrentPage={setCurrentPage} />
                    <InfoTab recipesCount={totalRows} />
                    <Recipes isLoading={isLoading} recipes={recipes} onToggleLikes={onToggleLikes} />
                    {!isLoading && <>    
                        {totalPages > 0 && <Pagination 
                            setCurrentPage={setCurrentPage} 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            pagesLimit={mediaQuery < 441 ? 3 : 5}  
                        />}
                    </>}
                    <Footer />
                </Container>
            </Main>
        </>
    );
};

export default RecipesPage;