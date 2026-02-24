import Container from '../../components/UI/Container';
import ProfileNavbar from '../../components/profilis/ProfileNavbar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth';
import { usePlanProducts } from '../../hooks/profile/usePlanProducts';
import { useUserDetails } from '../../hooks/profile/useUserDetails';

const ProfilisPageLayout = () => {
    document.body.style.backgroundColor = '#fff';
    document.title = 'Be žalos | Profilis';
    const { user } = useAuth();
    const user_id = user?.user_id;
    const user_role = user?.user_role;
    const is_subscription = user?.user_s_subscription || user?.user_subscription;
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
        </>
    );
};

export default ProfilisPageLayout;
