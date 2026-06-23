import type { Dispatch, SetStateAction } from 'react';

import type { RecipeFilters } from '../../hooks/useRecipes';
import { MacroInfo } from '../MacroInfo';

import styles from './Filters.module.scss';

// Primary categories — single chips rendered in the top row.
const primaryGroups: Record<string, { label: string; value: string }[]> = {
	dietary: [{ label: 'Be mėsos', value: 'vegan' }],
	type: [
		{ label: 'Pusryčiai', value: 'Pusryčiai' },
		{ label: 'Pietūs', value: 'Pietūs' },
		{ label: 'Vakarienė', value: 'Vakarienė' },
		{ label: 'Užkandžiai', value: 'Užkandžiai' },
	],
};

// Grouped pill filters — each rendered under its own label.
const pillGroups: Record<string, { label: string; options: { label: string; value: string }[] }> = {
	time: {
		label: 'Trukmė',
		options: [
			{ label: 'Iki 15min.', value: '0-15' },
			{ label: '15-30min.', value: '15-30' },
			{ label: '30-60min.', value: '30-60' },
			{ label: 'Virš 60min.', value: '60-600' },
		],
	},
	meal: {
		label: 'Valgio sudėtis',
		options: [
			{ label: 'A+B', value: 'A+B' },
			{ label: 'B+R', value: 'B+R' },
			{ label: 'A+R', value: 'A+R' },
		],
	},
	flavor: {
		label: 'Skonis',
		options: [
			{ label: 'Saldu', value: 'Saldu' },
			{ label: 'Sūru', value: 'Sūru' },
			{ label: 'Aštru', value: 'Aštru' },
		],
	},
};

interface FiltersProps {
	filters: RecipeFilters;
	setFilters: Dispatch<SetStateAction<RecipeFilters>>;
}

const isAllEmpty = (filters: RecipeFilters) =>
	!filters.dietary && !filters.type && !filters.meal && !filters.time && !filters.flavor;

export const Filters = ({ filters, setFilters }: FiltersProps) => {
	const toggleFilter = (key: string, value: string) => {
		setFilters((prevState) => ({
			...prevState,
			[key]: prevState[key] !== value ? value : '',
		}));
	};

	return (
		<div className={styles.filters}>
			<div className={styles.primary}>
				<button
					type="button"
					className={`${styles.cat} ${isAllEmpty(filters) ? styles.active : ''}`}
					onClick={() => setFilters({})}
				>
					Visi
				</button>

				{Object.entries(primaryGroups).map(([key, options]) =>
					options.map((filter) => (
						<button
							type="button"
							key={filter.value}
							className={`${styles.cat} ${filters[key] === filter.value ? styles.active : ''}`}
							onClick={() => toggleFilter(key, filter.value)}
						>
							{filter.label}
						</button>
					)),
				)}
			</div>

			<div className={styles.divider} />

			<div className={styles.groups}>
				{Object.entries(pillGroups).map(([key, group]) => (
					<div className={styles.group} key={key}>
						<div className={styles.groupLabel}>
							<span>{group.label}</span>
							{key === 'meal' && <MacroInfo />}
						</div>
						<div className={styles.groupPills}>
							{group.options.map((filter) => (
								<button
									type="button"
									key={filter.value}
									className={`${styles.pill} ${filters[key] === filter.value ? styles.active : ''}`}
									onClick={() => toggleFilter(key, filter.value)}
								>
									{filter.label}
								</button>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
