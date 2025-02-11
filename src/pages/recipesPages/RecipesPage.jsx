import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
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
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const RecipesPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const mediaQuery = useMediaQuery();
    const [isOpenFilters, setIsOpenFilters] = useState(false);

    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState('');
    
    const { isLoading, recipes, setRecipes, currentPage, setCurrentPage, totalPages, totalRows } = useRecipes({
        ...filters, 
        ...(search !== '' ? {search} : {})
    });

    
    const user_id = useAuth()?.loggedUser?.user_id || null;
    const { setIsOpenModal } = useAuth();
    // const navigate = useNavigate();

    const handleLike = async (video_id) => {
        if(!user_id) {
            setIsOpenModal(true);
            // navigate('/prisijungti');
        } else {
            const like = await axiosPrivate.post(`/videos/like/${user_id}/${video_id}`); 
            console.log(like)
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

                        <Recipes 
                            recipes={recipes} 
                            handleLike={handleLike}
                        />
                        
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