import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { axiosPrivate } from '../../../api/axios';
import AdminNavbar from '../navBar/AdminNavbar';

import styles from './AdminLayout.module.css';

const AdminLayout = () => {
	document.body.style.backgroundColor = '#eff1ef';

	const [stats, setStats] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const htmlElement = document.documentElement;
		htmlElement.style.backgroundColor = '#eff1ef';
	}, []);

	useEffect(() => {
		document.title = 'Be žalos | Admin';
		const getData = async () => {
			try {
				const { data } = await axiosPrivate.get('/admin/stats');
				setStats(data);
				setIsLoading(false);
			} catch (err) {
				console.log(err.message);
			}
		};
		getData();
	}, [axiosPrivate]);

	return (
		<div className={styles.mainContainer}>
			<AdminNavbar isLoading={isLoading} stats={stats} />
			<Outlet context={{ isLoading, stats, setStats }} />
		</div>
	);
};

export default AdminLayout;
