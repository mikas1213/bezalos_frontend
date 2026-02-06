import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth';
import Spinner from '../components/UI/Spinner';

interface RequireAuthProps {
    allowedRoles: number[];
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <Spinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to='/prisijungti' state={{ from: location }} replace />;
    }

    if (!user?.user_role || !allowedRoles.includes(user.user_role)) {
        return <Navigate to='/puslapis-nerastas' state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
