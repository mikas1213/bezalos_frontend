import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import ProfileNavbar from '../../components/profilis/ProfileNavbar';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useAuth  from '../../hooks/useAuth';
import { usePlanProducts } from '../../hooks/profile/usePlanProducts';
import { useUserPlans } from '../../hooks/profile/useUserPlans';

const ProfilisPageLayout = () => {
    document.body.style.backgroundColor = '#fff';
    const { auth } = useAuth();
    const { user_id, user_s_subscription, user_subscription } = jwtDecode(auth.accessToken);    
    const is_subscription = user_s_subscription || user_subscription;
    const { prodList } = usePlanProducts(is_subscription);
    const { plans, selectedPlan, setSelectedPlan, isLoading } = useUserPlans(user_id);

    return (
        <>
            <Navbar />
            <Main>          
                <Container>
                    <ProfileNavbar />
                </Container>      
                <Outlet context={{ is_subscription, prodList, plans, selectedPlan, setSelectedPlan, isLoading }} />
            </Main>
        </>
    );
};

export default ProfilisPageLayout;
