import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import AdminNavbar from '../navBar/AdminNavbar';

const AdminLayout = () => {
    document.body.style.backgroundColor = '#ECECEC';

    return (
        <div className={styles.mainContainer}>
            <AdminNavbar />
            <Outlet />
        </div>
    );
};

export default AdminLayout;