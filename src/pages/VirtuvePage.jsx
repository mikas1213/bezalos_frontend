import Main from '../components/UI/Main';
import Navbar from '../components/navbar/Navbar';
import Videos from '../components/virtuve/Videos';

import { jwtDecode } from "jwt-decode";
import useAuth  from '../hooks/useAuth';

const VirtuvePage = () => {  
    const { auth }  = useAuth();
    let loggedUser = {};
    if(auth.accessToken) loggedUser = jwtDecode(auth?.accessToken);
    const { user_id = '', user_subscription} = loggedUser;


    return (
        <>
            <Navbar />
            <Main>
                <Videos user_id={user_id} user_subscription={user_subscription} />
            </Main>
        </>
    );
};

export default VirtuvePage;