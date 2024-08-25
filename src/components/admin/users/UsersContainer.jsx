import styles from './UsersContainer.module.css';

const UsersContainer = ({ children }) => {
    
    return (
        <div className={styles.usersContainer}>
            {children}
        </div>
    );
};

export default UsersContainer;