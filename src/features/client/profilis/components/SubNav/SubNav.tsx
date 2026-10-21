import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { PROFILIS_NAV_LINKS, type ProfilisNavLink } from '../../constants/navLinks';
import { ListItem } from '../ListItem';

import styles from './SubNav.module.scss';

interface SubNavProps {
	links?: ProfilisNavLink[];
}

/**
 * Profilio skilčių navigacija. Siauruose ekranuose slenka horizontaliai,
 * o aktyvus punktas automatiškai paslenkamas į matomą sritį.
 */
export const SubNav = ({ links = PROFILIS_NAV_LINKS }: SubNavProps) => {
	const listRef = useRef<HTMLUListElement>(null);
	const { pathname } = useLocation();

	useEffect(() => {
		const list = listRef.current;
		const active = list?.querySelector<HTMLElement>('[aria-current="page"]');
		if (!list || !active) {
			return;
		}
		// Slenkamas tik pats sąrašas, ne visas puslapis.
		const left = active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2;
		list.scrollTo({ left, behavior: 'smooth' });
	}, [pathname]);

	return (
		<nav aria-label="Profilio skiltys" className={styles.subNav}>
			<ul ref={listRef} className={styles.list}>
				{links.map((link) => (
					<ListItem key={link.to} to={link.to} label={link.label} end={link.end} />
				))}
			</ul>
		</nav>
	);
};
