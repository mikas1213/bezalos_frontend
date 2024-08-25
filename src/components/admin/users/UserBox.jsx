import styles from './UserBox.module.css';

const UserBox = ({ children }) => {
    return (
        <div className={styles.userBox}>
            {children}
        </div>
    );
};

export const SideBox = ({ children }) => {
    return (
        <div className={styles.sideBox}>
            { children }
        </div>
    );
};

export default UserBox;