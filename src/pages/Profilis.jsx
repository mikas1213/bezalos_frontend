import Navbar from "../components/navbar/Navbar";
import Main from "../components/UI/Main";
import { jwtDecode } from "jwt-decode";
import useAuth  from '../hooks/useAuth';


const Profilis = () => {

    const { auth } = useAuth();
    const {user_name} = jwtDecode(auth.accessToken);
    
    return (
        <>
            <Navbar />
            <Main>
                <div className="profilis">Labas, {user_name} čia yra tavo profilis</div>
            </Main>
        </>
    );
};

export default Profilis;
