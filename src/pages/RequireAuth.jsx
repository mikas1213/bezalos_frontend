import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';

const RequireAuth = ({ allowedRoles }) => {
    
    const { auth } = useAuth();
    const location = useLocation();
    
    const loggedUser = auth.accessToken ? jwtDecode(auth?.accessToken) : {};
    
    return (
        allowedRoles?.includes(loggedUser.user_role)
            ? <Outlet />
            : auth?.accessToken 
                ? <Navigate to='/puslapis-nerastas' state={{from: location}} replace /> 
                : <Navigate to='/prisijungti' state={{from: location}} replace />
    );
};

export default RequireAuth;