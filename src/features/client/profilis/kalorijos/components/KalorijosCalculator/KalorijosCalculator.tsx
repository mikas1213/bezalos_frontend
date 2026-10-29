import { useState } from 'react';

import { KALORIJOS_ACTIVITIES } from '../../constants/KalorijosActivities';
import { calculateDailyCalories } from '../../utils/calculateCalories';
import { KalorijosForm, type KalorijosValues } from '../KalorijosForm';
import { KalorijosMembershipCta } from '../KalorijosMembershipCta';
import { KalorijosResult } from '../KalorijosResult';

import styles from './KalorijosCalculator.module.scss';

const INITIAL_VALUES: KalorijosValues = {
	gender: 'Moteris',
	age: '',
	height: '',
	weight: '',
	activityId: null,
};

/** Kalorijų skaičiuoklė be kortelės: įvestys, rezultatas su makroelementais ir narystės kvietimas. */
export const KalorijosCalculator = () => {
	const [values, setValues] = useState<KalorijosValues>(INITIAL_VALUES);

	// Kol aktyvumas nepasirinktas, skaičiuojama su koeficientu 1 (bazinis poreikis).
	const ratio = KALORIJOS_ACTIVITIES.find((activity) => activity.id === values.activityId)?.ratio ?? 1;
	const kcal = calculateDailyCalories({ ...values, ratio });

	return (
		<section aria-label="Kalorijų skaičiuoklė" className={styles.calculator}>
			<KalorijosForm values={values} onChange={(patch) => setValues((prev) => ({ ...prev, ...patch }))} />
			<KalorijosResult kcal={kcal} />
			<KalorijosMembershipCta />
		</section>
	);
};
