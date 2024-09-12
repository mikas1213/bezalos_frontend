import styles from './UsersContainer.module.css';
// import { memo } from 'react';
// const UsersContainer =  memo(function UsersContainer({ children }) {
const UsersContainer = ({ children }) => {
    
    return (
        <div className={styles.usersContainer}>
            {children}
        </div>
    );
};

export default UsersContainer;