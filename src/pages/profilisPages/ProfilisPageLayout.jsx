// import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import ProfileNavbar from '../../components/profilis/ProfileNavbar';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../hooks';
import { usePlanProducts } from '../../hooks/profile/usePlanProducts';
import { useUserDetails } from '../../hooks/profile/useUserDetails';

const ProfilisPageLayout = () => {
    document.body.style.backgroundColor = '#fff';
    //   <meta name="theme-color" content="#084747"></meta>
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ff0000');
    
    document.title = 'Be žalos | Profilis';
    const { auth } = useAuth();
    const { user_id, user_role, user_s_subscription, user_subscription } = jwtDecode(auth.accessToken); 

    const is_subscription = user_s_subscription || user_subscription;
    const { prodList } = usePlanProducts();

    const { 
        plans, 
        selectedPlan, 
        setSelectedPlan, 
        anketa, 
        setAnketa, 
        recipes, 
        setRecipes, 
        logicFilter,
        setLogicFilter,
        searchRecipe,
        setSearchRecipe,
        isLoading,
        
        /* PAGINATION RETURN */
        currentPage,
        totalPages,
        paginatedRecipes,
        setPaginatedRecipes,
        setCurrentPage

    } = useUserDetails(user_id);

    return (
        <>
            {/* <Navbar /> */}
            <Main>          
                <Container>
                    <ProfileNavbar />
                </Container>      
                {!isLoading && <Outlet context={{ 
                    user_role, 
                    is_subscription, 
                    prodList, 
                    plans, 
                    selectedPlan, 
                    setSelectedPlan, 
                    anketa, 
                    setAnketa, 
                    recipes,
                    setRecipes,
                    user_id, 
                    logicFilter,
                    setLogicFilter,
                    searchRecipe,
                    setSearchRecipe,
                    isLoading,
                    /* PAGINATION RETURN */
                    currentPage,
                    totalPages,
                    paginatedRecipes,
                    setPaginatedRecipes,
                    setCurrentPage
                }} />}
            </Main>
        </>
    );
};

export default ProfilisPageLayout;
