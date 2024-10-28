import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import ProfileNavbar from '../../components/profilis/ProfileNavbar';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useAuth  from '../../hooks/useAuth';

const ProfilisPageLayout = () => {
    document.body.style.backgroundColor = '#fff';
    const { auth } = useAuth();
    const { user_id, user_s_subscription, user_subscription } = jwtDecode(auth.accessToken);
    
    const is_subscription = user_s_subscription || user_subscription;
    return (
        <>
            <Navbar />
            <Main>          
                <Container>
                    <ProfileNavbar />
                    <Outlet context={{ user_id, is_subscription }} />
                </Container>      
            </Main>
        </>
    );
};

export default ProfilisPageLayout;
