import Navbar from "../components/navbar/Navbar";
import Main from "../components/UI/Main";
// import { jwtDecode } from "jwt-decode";
// import useAuth  from '../hooks/useAuth';
import InformationSoon from "../components/information_soon/InformationSoon";

const ProfilisPage = () => {

    // const { auth } = useAuth();
    // const {user_name} = jwtDecode(auth.accessToken);
    
    return (
        <>
            <Navbar />
            <Main>
                {/* <div className="profilis">{user_name}  </div> */}
                <InformationSoon />
            </Main>
        </>
    );
};

export default ProfilisPage;
