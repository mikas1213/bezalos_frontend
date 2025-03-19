import { useContext, useMemo } from 'react';
import AuthContext from '../context/AuthProvider';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    
    const { auth, setAuth, isOpenModal, setIsOpenModal } = useContext(AuthContext);
    const loggedUser = useMemo(() => {
        if (!auth?.accessToken) return null;
        try {
            return jwtDecode(auth.accessToken);
        } catch (error) {
            return null;
        }
    }, [auth?.accessToken]); 
    return { auth, setAuth, isOpenModal, setIsOpenModal, loggedUser };
};

export default useAuth;