import { Outlet } from 'react-router-dom';
import UserNav from '../../../components/admin/user/UserNav';

const UserPageLayout = () => {
    return (
        <>
            <UserNav />
            <Outlet />
        </>
    );
};

export default UserPageLayout;