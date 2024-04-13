import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
// import Spinner from '../components/UI/Spinner';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                // console.log('PersistLogin', err)
            } finally {
                setIsLoading(false);
            }
        };

        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, []);
    return (!isLoading && <Outlet />);
    // return (!isLoading && <Outlet />;
    // return (
    //     <>
    //         {isLoading ? <div style={{
    //             background: '#eff1ef', 
    //             height: '100vh',
    //             fontSize: '10rem',
    //             display: 'flex',
    //             justifyContent: 'center',
    //             alignItems: 'center'
    //         }}><Spinner /></div> : <Outlet />}
    //     </>
    // );
};

export default PersistLogin;