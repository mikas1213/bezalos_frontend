import { useContext, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

import { jwtDecode, type JwtPayload } from 'jwt-decode';

type CustomJwtPayload = {
    user_id?: string,
    user_name: string,
    user_role?: number,
    user_subscription: boolean,
    user_s_subscription: boolean,
    str_cus_id: string,
    u_status: string,
    s_status: string,
    is_course: boolean
} & JwtPayload;

const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    const { auth, setAuth, isOpenModal, setIsOpenModal } = context;
    
    const loggedUser = useMemo(() => {
        if (!auth?.accessToken) return null;
        try {
            return jwtDecode<CustomJwtPayload>(auth.accessToken);
        } catch (error) {
            return null;
        }
    }, [auth?.accessToken]); 
    return { auth, setAuth, isOpenModal, setIsOpenModal, loggedUser };
};

export default useAuth;