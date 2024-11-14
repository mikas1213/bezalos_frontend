import Authentication from "../components/auth/Authentication";
import FlexContainer from "../components/UI/FlexContainer";

const Login = () => {
    document.body.style.backgroundColor = '#fff';
    return (
        <FlexContainer>
            <Authentication />
        </FlexContainer>
    );
};

export default Login;