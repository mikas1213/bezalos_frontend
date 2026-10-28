import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

import { ChevronDown } from 'lucide-react';

import { PROFILIS_NAVBAR_LINKS, type ProfilisNavbarLink } from '../../constants/ProfilisNavbarLinks';
import { ProfilisNavbarItem } from '../ProfilisNavbarItem';

import styles from './ProfilisNavbar.module.scss';

/** Nuo šio pločio (įskaitytinai) vietoj juostos rodomas mygtukas ir apatinis langas. */
const SHEET_MEDIA_QUERY = '(max-width: 576px)';
const SECTION_LABEL = 'Mano mityba';

interface ProfilisNavbarProps {
	links?: ProfilisNavbarLink[];
}

/**
 * Profilio skilčių navigacija.
 * Plačiau nei 576 px – „pill“ juosta centre (siauresnėje juostoje punktai persikelia į kitą eilutę).
 * ≤ 576 px – mygtukas su dabartine skiltimi, kuris atidaro apatinį langą (bottom sheet) su visomis skiltimis.
 */
export const ProfilisNavbar = ({ links = PROFILIS_NAVBAR_LINKS }: ProfilisNavbarProps) => {
	const { pathname } = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const sheetRef = useRef<HTMLDivElement>(null);
	const sheetId = useId();
	const titleId = useId();

	const current = links.find((link) => matchPath({ path: link.to, end: link.end ?? false }, pathname));

	const close = useCallback(() => setIsOpen(false), []);

	// Kai langas atidarytas: Escape uždaro, puslapis neslenka, fokusas – ant aktyvaus punkto.
	// Ekranui praplatėjus virš 576 px langas uždaromas. Uždarius fokusas grįžta ant mygtuko.
	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const trigger = triggerRef.current;
		const media = window.matchMedia(SHEET_MEDIA_QUERY);
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close();
			}
		};
		const onMediaChange = (e: MediaQueryListEvent) => {
			if (!e.matches) {
				close();
			}
		};
		const prevOverflow = document.body.style.overflow;

		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', onKeyDown);
		media.addEventListener('change', onMediaChange);
		const sheet = sheetRef.current;
		(sheet?.querySelector<HTMLElement>('[aria-current="page"]') ?? sheet?.querySelector<HTMLElement>('a'))?.focus();

		return () => {
			document.body.style.overflow = prevOverflow;
			document.removeEventListener('keydown', onKeyDown);
			media.removeEventListener('change', onMediaChange);
			trigger?.focus();
		};
	}, [isOpen, close]);

	return (
		<nav aria-label="Profilio skiltys" className={styles.navbar}>
			<ul className={styles.list}>
				{links.map((link) => (
					<ProfilisNavbarItem key={link.to} to={link.to} label={link.label} end={link.end} />
				))}
			</ul>

			<div className={styles.mobile}>
				<span className={styles.caption} aria-hidden="true">
					{SECTION_LABEL}
				</span>
				<button
					ref={triggerRef}
					type="button"
					className={styles.trigger}
					aria-haspopup="dialog"
					aria-expanded={isOpen}
					aria-controls={sheetId}
					aria-label={`${SECTION_LABEL}: ${current?.label ?? 'pasirink skiltį'}`}
					onClick={() => setIsOpen(true)}
				>
					<span className={styles.triggerLabel}>{current?.label ?? 'Pasirink skiltį'}</span>
					<ChevronDown className={styles.chevron} aria-hidden="true" />
				</button>
			</div>

			{isOpen &&
				createPortal(
					<div className={styles.sheetRoot}>
						<div className={styles.backdrop} onClick={close} aria-hidden="true" />
						<div
							ref={sheetRef}
							id={sheetId}
							role="dialog"
							aria-modal="true"
							aria-labelledby={titleId}
							className={styles.sheet}
						>
							<span className={styles.handle} aria-hidden="true" />
							<p id={titleId} className={styles.sheetTitle}>
								{SECTION_LABEL}
							</p>
							<ul className={styles.sheetList}>
								{links.map((link) => (
									<ProfilisNavbarItem
										key={link.to}
										to={link.to}
										label={link.label}
										end={link.end}
										variant="sheet"
										onSelect={close}
									/>
								))}
							</ul>
						</div>
					</div>,
					document.body,
				)}
		</nav>
	);
};
