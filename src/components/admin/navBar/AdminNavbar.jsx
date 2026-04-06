import { FaFilm, FaHouse, FaNoteSticky, FaUserGroup } from 'react-icons/fa6';
import { GrServices } from 'react-icons/gr';
import { HiTemplate } from 'react-icons/hi';
import { IoFastFoodSharp } from 'react-icons/io5';
import { TbMailFilled } from 'react-icons/tb';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './AdminNavbar.module.css';

const AdminNavbar = ({ isLoading, stats }) => {
	const location = useLocation();
	const user_count = !isLoading ? stats.users : 0;
	const virtuve_count = !isLoading ? stats.virtuve_active : 0;
	const profilis_count = !isLoading ? stats.profilis_active : 0;
	const emails = !isLoading ? stats.emails : 0;

	const links = [
		{
			to: '/admin',
			label: 'Klientai',
			icon: <FaUserGroup />,
			notification: `${user_count} / ${virtuve_count} / ${profilis_count}`,
		},
		{ to: '/admin/planai', label: 'Mitybos planai', icon: <HiTemplate /> },
		{ to: '/admin/receptai', label: 'Receptai', icon: <IoFastFoodSharp /> },
		{ to: '/admin/paslaugos', label: 'Paslaugos', icon: <GrServices /> },
		{ to: '/admin/virtuve', label: 'Virtuvė', icon: <FaFilm /> },
		{ to: '/admin/mails', label: 'Mails', icon: <TbMailFilled />, notification: `${emails}` },
		{ to: '/admin/test3', label: 'Test', icon: <FaNoteSticky /> },
	];

	const isLinkActive = (path) => {
		if (path === '/admin') {
			return location.pathname === '/admin' || location.pathname === '/admin/';
		}
		return location.pathname.startsWith(path);
	};

	return (
		<div className={styles.adminNav}>
			<li className={`${styles.navItem} ${styles.navItemHome}`}>
				<NavLink to="/">
					<FaHouse />
					Pradžia
				</NavLink>
			</li>

			{links.map((link) => (
				<li key={link.to} className={styles.navItem}>
					<NavLink to={link.to} className={({ isActive }) => (isActive && isLinkActive(link.to) ? styles.active : '')}>
						{link.icon}
						{link.label}
						{link.notification && <span className={styles.notification}>{link.notification}</span>}
					</NavLink>
				</li>
			))}
		</div>
	);
};

export default AdminNavbar;
