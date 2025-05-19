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

export const SideBoxRow = ({ children }) => {
    return (
        <div className={styles.sideBoxRow}>
            { children }
        </div>
    );
};

export default UserBox;