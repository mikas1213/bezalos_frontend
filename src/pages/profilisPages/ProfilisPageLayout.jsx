import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import ProfileNavbar from '../../components/profilis/ProfileNavbar';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import useAuth  from '../../hooks/useAuth';

const ProfilisPageLayout = () => {

    const { auth } = useAuth();
    const { user_id } = jwtDecode(auth.accessToken);
    return (
        <>
            <Navbar />
            <Main>          
                <Container>
                    <ProfileNavbar />
                    <Outlet context={{ user_id }} />
                </Container>      
            </Main>
        </>
    );
};

export default ProfilisPageLayout;
