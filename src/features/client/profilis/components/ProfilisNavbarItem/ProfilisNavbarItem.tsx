import { NavLink } from 'react-router-dom';

import { Check } from 'lucide-react';

import styles from './ProfilisNavbarItem.module.scss';

interface ProfilisNavbarItemProps {
	to: string;
	label: string;
	/** Aktyvus tik tikslus kelias (pvz. `/profilis` neturi būti aktyvus `/profilis/anketa` puslapyje). */
	end?: boolean;
	/** `pill` – desktop/planšetės juosta, `sheet` – telefono apatinio lango eilutė. */
	variant?: 'pill' | 'sheet';
	onSelect?: () => void;
}

/** Vienas profilio navbar'o punktas. Aktyvus punktas gauna `aria-current="page"`. */
export const ProfilisNavbarItem = ({ to, label, end = false, variant = 'pill', onSelect }: ProfilisNavbarItemProps) => {
	const isSheet = variant === 'sheet';

	return (
		<li className={isSheet ? styles.sheetItem : styles.item}>
			<NavLink
				to={to}
				end={end}
				onClick={onSelect}
				className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}
			>
				{({ isActive }) => (
					<>
						<span>{label}</span>
						{isSheet && isActive && <Check className={styles.check} aria-hidden="true" />}
					</>
				)}
			</NavLink>
		</li>
	);
};
