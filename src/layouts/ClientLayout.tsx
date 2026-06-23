import { Outlet } from 'react-router';
import { useLocation } from 'react-router';

import { Footer, Navbar } from '../components/layout';
import { Stack } from '../components/Shared';

import styles from './ClientLayout.module.css';

const ClientLayout = () => {
	const location = useLocation();

	return (
		<Stack splitAfter={2} className={styles.clientLayout}>
			<Navbar />
			<main
				style={{
					paddingBlockStart: location.pathname === '/' ? '0' : '5rem',
				}}
			>
				<Outlet />
			</main>
			<Footer />
		</Stack>
	);
};

export default ClientLayout;
