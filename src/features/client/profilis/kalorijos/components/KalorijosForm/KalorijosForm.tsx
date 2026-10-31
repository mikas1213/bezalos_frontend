import { useId } from 'react';

import type { ActivityId } from '../../constants/KalorijosActivities';
import type { Gender } from '../../utils/calculateCalories';
import { KalorijosActivitySelect } from '../KalorijosActivitySelect';

import styles from './KalorijosForm.module.scss';

export interface KalorijosValues {
	gender: Gender;
	age: string;
	height: string;
	weight: string;
	activityId: ActivityId | null;
}

type NumericField = 'age' | 'height' | 'weight';

interface KalorijosFormProps {
	values: KalorijosValues;
	onChange: (patch: Partial<KalorijosValues>) => void;
}

const GENDERS: Gender[] = ['Moteris', 'Vyras'];

const FIELDS: { key: NumericField; label: string; unit: string }[] = [
	{ key: 'age', label: 'Amžius', unit: 'm.' },
	{ key: 'height', label: 'Ūgis', unit: 'cm' },
	{ key: 'weight', label: 'Svoris', unit: 'kg' },
];

/**
 * Skaičiuoklės įvestys: lytis, amžius, ūgis, svoris ir aktyvumas.
 * Desktop – visi vienoje eilutėje; planšetėje aktyvumas nukeliamas į atskirą eilutę,
 * telefone atskirose eilutėse – ir lytis.
 */
export const KalorijosForm = ({ values, onChange }: KalorijosFormProps) => {
	const id = useId();
	const genderLabelId = `${id}-gender`;

	return (
		<div className={styles.form}>
			<div className={styles.gender}>
				<span id={genderLabelId} className={styles.label}>
					Lytis
				</span>
				<div role="radiogroup" aria-labelledby={genderLabelId} className={styles.segmented}>
					{GENDERS.map((gender) => {
						const isActive = values.gender === gender;
						return (
							<button
								key={gender}
								type="button"
								role="radio"
								aria-checked={isActive}
								className={`${styles.segment} ${isActive ? styles.segmentActive : ''}`}
								onClick={() => onChange({ gender })}
							>
								{gender}
							</button>
						);
					})}
				</div>
			</div>

			{FIELDS.map(({ key, label, unit }) => (
				<div key={key}>
					<label htmlFor={`${id}-${key}`} className={styles.label}>
						{label}
					</label>
					<div className={styles.inputWrap}>
						<input
							id={`${id}-${key}`}
							type="text"
							inputMode="decimal"
							autoComplete="off"
							className={styles.input}
							value={values[key]}
							onChange={(e) => onChange({ [key]: e.target.value.replace(',', '.') })}
						/>
						<span className={styles.unit} aria-hidden="true">
							{unit}
						</span>
					</div>
				</div>
			))}

			<div className={styles.activity}>
				<KalorijosActivitySelect value={values.activityId} onChange={(activityId) => onChange({ activityId })} />
			</div>
		</div>
	);
};
