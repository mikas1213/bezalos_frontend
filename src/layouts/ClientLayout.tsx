import { Outlet } from 'react-router';
import { Navbar } from '../components/layout';
import { useLocation } from 'react-router';
import { useMediaQuery } from '../contexts';
import type { CSSProperties } from 'react';

const ClientLayout = () => {
    
    const location = useLocation();
    const mediaQuery = useMediaQuery();

    const mainStyles = {
        backgroundColor: 'var(--white-100)',
        paddingTop: location.pathname === '/receptai' ? '0' : mediaQuery < 441 ? 'var(--nav-height-60)' : mediaQuery < 577 ? 'var(--nav-height-70)' : 'var(--nav-height-80)'
    } as CSSProperties

    type PageName = 'home' | 'recipes' | 'default';
    const locationMap: Record<string, PageName> = {
        '/': 'home',
        '/receptai': 'recipes'
    };

    const currentPage = (locationMap[location.pathname] || 'default') as PageName;
	return (
		<>
            <Navbar page={currentPage} />
            <main style={mainStyles}>
                <Outlet />
            </main>
		</>
	);
}

export default ClientLayout;