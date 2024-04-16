import Authentication from "../components/auth/Authentication";
import FlexContainer from "../components/UI/FlexContainer";
import Navbar from '../components/navbar/Navbar';

const Login = () => {
    return (
        <>
        {/* <Navbar /> */}
        <FlexContainer>
            
            <Authentication />
        </FlexContainer>
        </>
    );
};

export default Login;