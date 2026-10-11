import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { axiosPrivate } from '../../../api/axios';
import AdminNavbar from '../navBar/AdminNavbar';

import styles from './AdminLayout.module.scss';

export type AdminStats = {
	users: number;
	emails: number;
	virtuve_active: number;
	profilis_active: number;
	plans: number;
	meals: number;
	products: number;
	email_stats: { subscriber: number; offer: number; test: number };
};

export type AdminOutletContext = {
	isLoading: boolean;
	stats: AdminStats | null;
	setStats: Dispatch<SetStateAction<AdminStats | null>>;
};

const AdminLayout = () => {


	const [stats, setStats] = useState<AdminStats | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const htmlElement = document.documentElement;
        document.body.style.backgroundColor = '#eff1ef';
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
				console.log(err instanceof Error ? err.message : err);
			}
		};
		getData();
	}, []);

	return (
		<div className={styles.mainContainer}>
			<AdminNavbar isLoading={isLoading} stats={stats} />
			<Outlet context={{ isLoading, stats, setStats }} />
		</div>
	);
};

export default AdminLayout;
