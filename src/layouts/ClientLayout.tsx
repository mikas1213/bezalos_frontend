import { type CSSProperties, useEffect } from 'react';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router';

import { Footer, Navbar } from '../components/layout';
import { Stack } from '../components/Shared';
import { useMediaQuery } from '../contexts/MediaQueryProvider';

import styles from './ClientLayout.module.css';

const ClientLayout = () => {
	const location = useLocation();
	const mediaQuery = useMediaQuery();

	const mainStyles = {
		backgroundColor: 'var(--white-100)',
		paddingTop:
			location.pathname === '/receptai'
				? '0'
				: mediaQuery < 441
					? 'var(--nav-height-60)'
					: mediaQuery < 577
						? 'var(--nav-height-70)'
						: 'var(--nav-height-80)',
	} as CSSProperties;

	type PageName = 'home' | 'recipes' | 'default';
	const locationMap: Record<string, PageName> = {
		'/': 'home',
		'/receptai': 'recipes',
	};

	const currentPage = (locationMap[location.pathname] || 'default') as PageName;
	useEffect(() => {
		const htmlElement = document.documentElement;
		currentPage === 'home'
			? (htmlElement.style.backgroundColor = 'var(--dark-green-500)')
			: (htmlElement.style.backgroundColor = 'var(--white-100)');
	}, [currentPage]);

	return (
		<Stack splitAfter={2} className={styles.clientLayout}>
			<Navbar page={currentPage} />
			<main style={mainStyles}>
				<Outlet />
			</main>
			<Footer />
		</Stack>
	);
};

export default ClientLayout;
