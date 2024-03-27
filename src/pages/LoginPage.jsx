import styles from './LoginPage.module.css';
import Authentication from "../components/auth/Authentication";

const Login = () => {
    return (
        <div className={styles.login}>
            <Authentication />
        </div>
    );
};

export default Login;