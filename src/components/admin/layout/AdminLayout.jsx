import { Outlet } from 'react-router-dom';
import MainContainer from './MainContainer';
import AdminNavbar from '../navBar/AdminNavbar';

const AdminLayout = () => {
    document.body.style.backgroundColor = '#ECECEC';
    return (
        <MainContainer>
            <AdminNavbar />
            <Outlet />
        </MainContainer>
    );
};

export default AdminLayout;