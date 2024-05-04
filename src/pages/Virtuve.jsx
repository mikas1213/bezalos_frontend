import Main from '../components/UI/Main';
import Navbar from '../components/navbar/Navbar';
import Videos from '../components/virtuve/Videos';

// import { jwtDecode } from "jwt-decode";
// import useAuth  from '../hooks/useAuth';

const Virtuve = () => {  
    // const { auth } = useAuth();
    // if(auth) {
        // const { user_name } = jwtDecode(auth?.accessToken);
        // console.log(jwtDecode(auth?.accessToken))
    // }
    // const {user_name} = jwtDecode(auth?.accessToken);


    return (
        <>
            <Navbar />
            <Main>
                <Videos />
            </Main>
        </>
    );
};

export default Virtuve;