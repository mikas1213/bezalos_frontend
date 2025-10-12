import useAuth from '../../../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '../../../../contexts';
import { useEffect, useState } from 'react';
import type { Pages, NavHeight, NavbarState } from '../types';

const getNavHeight = (mq: number): NavHeight => {
    if(mq < 441) return 'var(--nav-height-60)';
    if(mq < 577) return 'var(--nav-height-70)';
    if(mq < 769) return 'var(--nav-height-60)';
    return 'var(--nav-height-80)';
};

const useNavbar = (page: Pages): NavbarState => {
    
	const { loggedUser, isOpenModal, setIsOpenModal } = useAuth();
    const [isOpenBurger, setIsOpenBurger] = useState<boolean>(false);
    const mediaQuery = useMediaQuery();

	const user_id = loggedUser?.user_id || null;
	const user_role = loggedUser?.user_role || null;

	const scrollThreshold: number = page === 'home' ? 500 : page === 'recipes' ? 20 : 100;
	const [isScroll, setIsScroll] = useState<boolean>(false);

	const location = useLocation();
	const [_, currentPage] = location.pathname.split('/');
    const responsiveNavHeight: NavHeight = getNavHeight(mediaQuery);

	useEffect(() => {
		const changeColor = () => setIsScroll(window.scrollY > scrollThreshold);
		window.addEventListener('scroll', changeColor);
		return () => window.removeEventListener('scroll', changeColor);
	}, [scrollThreshold]);

    useEffect(() => {
        setIsOpenBurger(false);
    }, [location.pathname, mediaQuery]);
    
    return {
        user_id,
        user_role,
        isScroll,
        currentPage,
        isOpenBurger,
        setIsOpenBurger,
        isOpenModal, 
        setIsOpenModal,
        responsiveNavHeight
    };
};

export default useNavbar;