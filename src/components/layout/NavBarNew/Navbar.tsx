import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import logoIcon from '../../../assets/icons/png/logo/icon_180x180.png';
import { useAuth, useAuthModal } from '../../../features/auth';
import { roles } from '../../../utils/roles';

import styles from './Navbar.module.scss';

type NavItem = { to: string; label: string };

const NAV_ITEMS: NavItem[] = [
	{ to: '/atlik-testa', label: 'Atlik testą' },
	{ to: '/virtuve', label: 'Virtuvė' },
	{ to: '/receptai', label: 'Receptai' },
	{ to: '/straipsniai', label: 'Straipsniai' },
	{ to: '/paslaugos', label: 'Paslaugos' },
	{ to: '/naryste', label: 'Narystė' },
];

// Shield glyph flagging the admin-only entry point.
const ShieldIcon = () => (
	<svg viewBox="0 0 16 16" aria-hidden="true" className={styles.adminIcon}>
		<path
			d="M8 1.5 13 3.2v4.3c0 3.2-2.1 5.6-5 6.9-2.9-1.3-5-3.7-5-6.9V3.2L8 1.5Z"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			strokeLinejoin="round"
		/>
		<path
			d="M5.8 7.9 7.3 9.4 10.2 6"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

// Be žalos navbar — floating, centered pill pinned to the top of the page.
// Scroll behaviour: visible near the top or when scrolling up; slides out of
// view once you scroll down past half a viewport.
export const Navbar = () => {
	const { user, logout } = useAuth();
	const { authOpenModal } = useAuthModal();
	const navigate = useNavigate();
	const location = useLocation();

	const [hidden, setHidden] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const lastY = useRef(0);

	// Auth-derived visibility, ported from the legacy navbar (useNavbar):
	// the Profilis link shows for any signed-in user, the Admin entry only
	// for the admin role.
	const isLoggedIn = Boolean(user?.user_id);
	const isAdmin = user?.user_role === roles.admin;

	// Profilis is appended to the public items once the user is signed in.
	const navItems: NavItem[] = isLoggedIn ? [...NAV_ITEMS, { to: '/profilis', label: 'Profilis' }] : NAV_ITEMS;

	// Mobile menu — lock page scroll while open; close on Escape and on resize
	// back to desktop widths.
	useEffect(() => {
		if (!menuOpen) return;
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setMenuOpen(false);
		};
		const onResize = () => {
			if (window.innerWidth > 1024) setMenuOpen(false);
		};
		window.addEventListener('keydown', onKey);
		window.addEventListener('resize', onResize);
		return () => {
			document.body.style.overflow = prevOverflow;
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('resize', onResize);
		};
	}, [menuOpen]);

	useEffect(() => {
		lastY.current = window.scrollY;

		const onScroll = () => {
			const y = window.scrollY;
			const dy = y - lastY.current;

			setScrolled(y > 6); // raise the pill's shadow only once scrolling starts

			if (y <= 6) {
				setHidden(false); // near the top → always show
			} else if (dy < -4) {
				setHidden(false); // scrolling up → reveal
			} else if (dy > 4 && y > window.innerHeight * 0.95) {
				setHidden(true); // hide only after ≥ half a screen
			}

			if (Math.abs(dy) > 2) lastY.current = y; // ignore sub-pixel jitter
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	}, [location.pathname]);

	const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(`${to}/`);

	const go = (to: string) => {
		setMenuOpen(false);
		navigate(to);
	};

	const handleAuth = () => {
		setMenuOpen(false);
		if (user) {
			void logout();
		} else {
			authOpenModal('auth');
		}
	};

	const authLabel = user ? 'Atsijungti' : 'Prisijungti';

	return (
		<div className={`${styles.nav} ${hidden && !menuOpen ? styles.hidden : ''}`}>
			<nav className={`${styles.pill} ${scrolled ? styles.scrolled : ''}`}>
				<a className={styles.brand} onClick={() => go('/')}>
					<span className={styles.badge} aria-hidden="true">
						<img src={logoIcon} alt="" />
					</span>
					{/* <span className={styles.word}>Be žalos</span> */}
				</a>

				<span className={styles.divider} aria-hidden="true" />

				<div className={styles.items}>
					{navItems.map((it) => (
						<a
							key={it.to}
							className={`${styles.item} ${isActive(it.to) ? styles.active : ''}`}
							onClick={() => go(it.to)}
						>
							<span data-text={it.label}>{it.label}</span>
							<div className={styles.indicator} />
						</a>
					))}
				</div>

				{isAdmin && (
					<a
						className={`${styles.admin} ${isActive('/admin') ? styles.adminActive : ''}`}
						onClick={() => go('/admin')}
						aria-label="Administravimas"
					>
						<ShieldIcon />
						<span>Admin</span>
					</a>
				)}

				<button className={styles.login} type="button" onClick={handleAuth}>
					{authLabel}
				</button>

				<button
					className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
					type="button"
					aria-label={menuOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
					aria-expanded={menuOpen}
					onClick={() => setMenuOpen((v) => !v)}
				>
					<span />
					<span />
				</button>
			</nav>

			{menuOpen && <div className={styles.menuBackdrop} onClick={() => setMenuOpen(false)} />}

			{menuOpen && (
				<div className={styles.menu}>
					<div className={styles.menuItems}>
						{navItems.map((it, i) => (
							<a
								key={it.to}
								className={`${styles.menuItem} ${isActive(it.to) ? styles.active : ''}`}
								style={{ animationDelay: `${0.05 + i * 0.035}s` }}
								onClick={() => go(it.to)}
							>
								<span>{it.label}</span>
								<svg viewBox="0 0 16 16" aria-hidden="true">
									<path
										d="M6 3.5 10.5 8 6 12.5"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.6"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</a>
						))}
					</div>

					{isAdmin && (
						<>
							<div className={styles.menuDivider} />
							<a
								className={`${styles.menuAdmin} ${isActive('/admin') ? styles.active : ''}`}
								onClick={() => go('/admin')}
							>
								<span className={styles.menuAdminLabel}>
									<ShieldIcon />
									Admin
								</span>
								<svg viewBox="0 0 16 16" aria-hidden="true">
									<path
										d="M6 3.5 10.5 8 6 12.5"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.6"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</a>
						</>
					)}

					<div className={styles.menuDivider} />
					<button className={styles.menuLogin} type="button" onClick={handleAuth}>
						{authLabel}
					</button>
				</div>
			)}
		</div>
	);
};
