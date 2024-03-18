import styles from './SignupHeader.module.css';
import { PiUserCirclePlusDuotone } from "react-icons/pi";

const SignupHeader = () => {
    return (
        <div className={styles.header}>
            <PiUserCirclePlusDuotone className={styles.icon} />
        </div>
    );
};

export default SignupHeader;