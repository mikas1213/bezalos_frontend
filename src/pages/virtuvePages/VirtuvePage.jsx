import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import useAuth  from '../../hooks/useAuth';
import Main from '../../components/UI/Main';
import Navbar from '../../components/navbar/Navbar';
import Videos from '../../components/virtuve/Videos';

const VirtuvePage = () => {  
    useEffect(() => {
        document.body.style.backgroundColor = '#fff';
        document.title = 'Be žalos | Virtuvė';
    }, []);
    
    const { auth }  = useAuth();
    let loggedUser = {};
    if(auth.accessToken) loggedUser = jwtDecode(auth?.accessToken);
    const { user_id = '', u_status, s_status} = loggedUser;

    return (
        <>
            <Navbar />
            <Main>
                <Videos 
                    user_id={user_id} 
                    u_status={u_status}
                    s_status={s_status} 
                />
            </Main>
        </>
    );
};

export default VirtuvePage;