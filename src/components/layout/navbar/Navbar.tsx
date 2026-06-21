import { NavLink, useLocation } from 'react-router-dom';

import { useAuth, useAuthModal } from '../../../features/auth';
import { roles } from '../../../utils/roles';
import { Box, Cluster, Container } from '../../Shared';
import { Logo } from '../../Shared/Logo';

import Hamburger from './hamburger/Hamburger';
import useNavbar from './hooks/useNavbar';
import MobileItems from './mobileitems/MobileItems';
import {
	ArticleIcon,
	AtlikTestaIcon,
	AtsijungtiIcon,
	NarysteIcon,
	PaslaugosIcon,
	PrisijungtiIcon,
	ProfilisIcon,
	ReceptaiIcon,
	VirtuveIcon,
} from './icons';
import type { NavbarProps } from './types';

import styles from './Navbar.module.css';

export const Navbar = ({ page = 'default' }: NavbarProps) => {
	const { logout } = useAuth();
	const { authOpenModal } = useAuthModal();

	const location = useLocation();
	const { isScroll, user_id, user_role, isOpenBurger, setIsOpenBurger, responsiveNavHeight } = useNavbar(page);
	const color = page === 'home' && !isScroll ? 'var(--light-green-grey-100)' : 'var(--dark-green-600)';

	const navBarClasses = [styles.nav, styles[`${page}_${isScroll ? 'scrolled' : 'at_top'}`]].filter(Boolean).join(' ');

	return (
		<Container as="nav" maxWidth="100vw" padding="0" className={navBarClasses}>
			<Container maxWidth="var(--content-width)">
				<Cluster className={styles.navDesktop} justify="space-between" align="center" height={responsiveNavHeight}>
					<NavLink to="/">
						<Logo color={color} />
					</NavLink>

					{user_role === roles.admin && (
						<NavLink to="/admin" className={styles.adminItemMobile}>
							<span>Admin</span>
						</NavLink>
					)}

					<Cluster className={styles.navItems} align="center" gap="clamp(0rem, 3.125vw, 3.2rem)">
						<NavLink to="/atlik-testa" className={styles.listItem}>
							<span>Atlik testą</span>
							<div className={styles.indicator}></div>
						</NavLink>

						<NavLink to="/virtuve" className={styles.listItem}>
							<span>Virtuvė</span>
							<div className={styles.indicator}></div>
						</NavLink>

						<NavLink to="/receptai" className={styles.listItem}>
							<span>Receptai</span>
							<div className={styles.indicator}></div>
						</NavLink>

						<NavLink to="/straipsniai" className={styles.listItem}>
							<span>Straipsniai</span>
							<div className={styles.indicator}></div>
						</NavLink>

						<NavLink to="/paslaugos" className={styles.listItem}>
							<span>Paslaugos</span>
							<div className={styles.indicator}></div>
						</NavLink>

						<NavLink to="/naryste" className={styles.listItem}>
							<span>Narystė</span>
							<div className={styles.indicator}></div>
						</NavLink>

						{user_id && (
							<NavLink to="/profilis" className={styles.listItem}>
								<span>Profilis</span>
								<div className={styles.indicator}></div>
							</NavLink>
						)}

						{user_role === roles.admin && (
							<NavLink to="/admin" className={styles.adminItem}>
								<span>Admin</span>
							</NavLink>
						)}

						<Box>
							{!user_id ? (
								<button type="button" onClick={() => authOpenModal('auth')} className={styles.loginBtn}>
									Prisijungti
								</button>
							) : (
								<button type="button" className={styles.loginBtn} onClick={async () => await logout()}>
									Atsijungti
								</button>
							)}
						</Box>
					</Cluster>
					<Hamburger page={page} isScroll={isScroll} isOpenBurger={isOpenBurger} setIsOpenBurger={setIsOpenBurger} />
				</Cluster>
			</Container>

			<MobileItems isOpenBurger={isOpenBurger}>
				<NavLink
					to="/atlik-testa"
					className={({ isActive }) => (isActive ? `${styles.listItemMobile} ${styles.active}` : styles.listItemMobile)}
				>
					<AtlikTestaIcon
						color={location.pathname.startsWith('/atlik-testa') ? 'var(--light-green-600)' : 'var(--dark-green-600)'}
					/>
					<span>Atlik testą</span>
				</NavLink>

				<NavLink
					to="/virtuve"
					className={({ isActive }) => (isActive ? `${styles.listItemMobile} ${styles.active}` : styles.listItemMobile)}
				>
					<VirtuveIcon
						color={location.pathname.startsWith('/virtuve') ? 'var(--light-green-600)' : 'var(--dark-green-600)'}
					/>
					<span>Virtuvė</span>
				</NavLink>

				<NavLink
					to="/receptai"
					className={({ isActive }) => (isActive ? `${styles.listItemMobile} ${styles.active}` : styles.listItemMobile)}
				>
					<ReceptaiIcon
						color={location.pathname.startsWith('/receptai') ? 'var(--light-green-600)' : 'var(--dark-green-600)'}
					/>
					<span>Receptai</span>
				</NavLink>

				<NavLink
					to="/straipsniai"
					className={({ isActive }) => (isActive ? `${styles.listItemMobile} ${styles.active}` : styles.listItemMobile)}
				>
					<ArticleIcon
						color={location.pathname.startsWith('/straipsniai') ? 'var(--light-green-600)' : 'var(--dark-green-600)'}
					/>
					<span>Straipsniai</span>
				</NavLink>

				<NavLink
					to="/paslaugos"
					className={({ isActive }) => (isActive ? `${styles.listItemMobile} ${styles.active}` : styles.listItemMobile)}
				>
					<PaslaugosIcon
						color={location.pathname.startsWith('/paslaugos') ? 'var(--light-green-600)' : 'var(--dark-green-600)'}
					/>
					<span>Paslaugos</span>
				</NavLink>

				<NavLink
					to="/naryste"
					className={({ isActive }) => (isActive ? `${styles.listItemMobile} ${styles.active}` : styles.listItemMobile)}
				>
					<NarysteIcon
						color={location.pathname.startsWith('/naryste') ? 'var(--light-green-600)' : 'var(--dark-green-600)'}
					/>
					<span>Narystė</span>
				</NavLink>

				{user_id && (
					<NavLink
						to="/profilis"
						className={({ isActive }) =>
							isActive ? `${styles.listItemMobile} ${styles.active}` : styles.listItemMobile
						}
					>
						<ProfilisIcon
							color={location.pathname.startsWith('/profilis') ? 'var(--light-green-600)' : 'var(--dark-green-600)'}
						/>
						<span>Profilis</span>
					</NavLink>
				)}

				{!user_id ? (
					<li className={`${styles.listItemMobile} ${styles.signout}`} onClick={() => authOpenModal('auth')}>
						<PrisijungtiIcon />
						<span>Prisijungti</span>
					</li>
				) : (
					<li className={`${styles.listItemMobile} ${styles.signout}`} onClick={async () => await logout()}>
						<AtsijungtiIcon />
						<span>Atsijungti</span>
					</li>
				)}
			</MobileItems>
		</Container>
	);
};
