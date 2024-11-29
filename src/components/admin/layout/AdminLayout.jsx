import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import AdminNavbar from '../navBar/AdminNavbar';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const AdminLayout = () => {
    document.body.style.backgroundColor = '#eff1ef';
    const axiosPrivate = useAxiosPrivate();
    const [stats, setStats] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axiosPrivate.get('/admin/stats');
                setStats(data);
                setIsLoading(false);
            } catch (err) {
                console.log(err.message)
            }
        }
        getData();
    }, [axiosPrivate]);
    
    return (
        <div className={styles.mainContainer}>
            <AdminNavbar isLoading={isLoading} stats={stats} />
            <Outlet context={{isLoading, stats}} />
        </div>
    );
};

export default AdminLayout;