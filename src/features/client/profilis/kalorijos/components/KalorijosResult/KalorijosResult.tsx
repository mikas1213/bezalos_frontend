import { Flame } from 'lucide-react';

import { AnimatedNumber } from '../../../components/AnimatedNumber';
import { calculateMacros, type MacroKey } from '../../utils/calculateCalories';

import styles from './KalorijosResult.module.scss';

interface KalorijosResultProps {
	/** Dienos kalorijų poreikis; 0 – duomenys dar neįvesti. */
	kcal: number;
	/** Mažiausias rekomenduojamas kiekis (bazinis poreikis be aktyvumo). */
	minKcal: number;
}

/** Skaitliukų trukmės (s), kaip ankstesniame puslapyje: kcal greičiausiai, makroelementai – vienas po kito. */
const KCAL_DURATION = 1;
const MACRO_DURATION: Record<MacroKey, number> = { b: 1.8, a: 2, r: 2.2 };

/** Skaičiuoklės rezultatas: dienos kalorijos ir makroelementų pasiskirstymas. */
export const KalorijosResult = ({ kcal, minKcal }: KalorijosResultProps) => {
	if (kcal <= 0) {
		return (
			<div className={styles.result} aria-live="polite">
				<p className={styles.empty}>Suvedus duomenis – rezultatas atsiras čia.</p>
			</div>
		);
	}

	const macros = calculateMacros(kcal);

	return (
		<div className={styles.result}>
			{/* Skaitliukai keičiasi kas kadrą, todėl ekrano skaitytuvui pateikiama tik galutinė reikšmė. */}
			<p className={styles.srOnly} aria-live="polite">
				{`Dienos energijos poreikis ${Math.round(kcal)} kcal. `}
				{`Mažiausias rekomenduojamas kalorijų kiekis ${Math.round(minKcal)} kcal. `}
				{macros.map((m) => `${m.name} ${Math.round(m.grams)} g`).join(', ')}
			</p>
			<Flame className={styles.flame} aria-hidden="true" />
			<div className={styles.kcal} aria-hidden="true">
				<span className={styles.kcalValue}>
					<b className={styles.kcalNumber}>
						<AnimatedNumber value={kcal} duration={KCAL_DURATION} />
					</b>
					<span className={styles.kcalUnit}>kcal</span>
				</span>
			</div>
			<p className={styles.minimum} aria-hidden="true">
				Mažiausias rekomenduojamas kalorijų kiekis:{' '}
				<b>
					<AnimatedNumber value={minKcal} duration={KCAL_DURATION} /> kcal
				</b>
			</p>

			<ul className={styles.macros} aria-hidden="true">
				{macros.map((macro) => (
					<li key={macro.key} className={`${styles.macro} ${styles[macro.key]}`}>
						<span className={styles.macroName}>
							{macro.name}
							<span className={styles.macroPercent}>{macro.percent} %</span>
						</span>
						<span className={styles.macroGrams}>
							<b>
								<AnimatedNumber value={macro.grams} duration={MACRO_DURATION[macro.key]} />
							</b>
							<span>g</span>
						</span>
						<span className={styles.macroBar} aria-hidden="true">
							<span style={{ width: `${macro.percent}%` }} />
						</span>
						<span className={styles.macroKcal}>
							<AnimatedNumber value={macro.kcal} duration={MACRO_DURATION[macro.key]} /> kcal
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};
