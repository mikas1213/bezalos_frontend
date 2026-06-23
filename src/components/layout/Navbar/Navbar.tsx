import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import cx from 'classnames';

import logoIcon from '../../../assets/icons/png/logo/icon_180x180.png';
import { useAuth, useAuthModal } from '../../../features/auth';
import { roles } from '../../../utils/roles';

import { ChevronIcon, LoginIcon, LogoutIcon, ShieldIcon } from './icons';

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

export const Navbar = () => {
	const { user, logout } = useAuth();
	const { authOpenModal } = useAuthModal();
	const navigate = useNavigate();
	const location = useLocation();

	const [hidden, setHidden] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const lastY = useRef(0);

	const isLoggedIn = Boolean(user?.user_id);
	const isAdmin = user?.user_role === roles.admin;

	const navItems: NavItem[] = isLoggedIn ? [...NAV_ITEMS, { to: '/profilis', label: 'Profilis' }] : NAV_ITEMS;

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
		<div className={cx(styles.nav, { [styles.hidden]: hidden && !menuOpen })}>
			<nav className={cx(styles.pill, { [styles.scrolled]: scrolled })}>
				<a className={styles.brand} onClick={() => go('/')}>
					<span className={styles.badge} aria-hidden="true">
						<img src={logoIcon} alt="" />
					</span>
					<span className={styles.word}>Be žalos</span>
				</a>

				<span className={styles.divider} aria-hidden="true" />

				<div className={styles.items}>
					{navItems.map((it) => (
						<a key={it.to} className={cx(styles.item, { [styles.active]: isActive(it.to) })} onClick={() => go(it.to)}>
							<span data-text={it.label}>{it.label}</span>
							<div className={styles.indicator} />
						</a>
					))}
				</div>

				{isAdmin && (
					<a
						className={cx(styles.admin, { [styles.adminActive]: isActive('/admin') })}
						onClick={() => go('/admin')}
						aria-label="Administravimas"
					>
						<ShieldIcon className={styles.adminIcon} />
						<span>Admin</span>
					</a>
				)}

				<button className={styles.login} type="button" onClick={handleAuth} aria-label={authLabel}>
					{user ? <LogoutIcon className={styles.loginIcon} /> : <LoginIcon className={styles.loginIcon} />}
					<span className={styles.loginLabel}>{authLabel}</span>
				</button>

				<button
					className={cx(styles.burger, { [styles.open]: menuOpen })}
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
								className={cx(styles.menuItem, { [styles.active]: isActive(it.to) })}
								style={{ animationDelay: `${0.05 + i * 0.035}s` }}
								onClick={() => go(it.to)}
							>
								<span>{it.label}</span>
								<ChevronIcon />
							</a>
						))}
					</div>

					{isAdmin && (
						<>
							<div className={styles.menuDivider} />
							<a
								className={cx(styles.menuAdmin, { [styles.active]: isActive('/admin') })}
								onClick={() => go('/admin')}
							>
								<span className={styles.menuAdminLabel}>
									<ShieldIcon className={styles.adminIcon} />
									Admin
								</span>
								<ChevronIcon />
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
