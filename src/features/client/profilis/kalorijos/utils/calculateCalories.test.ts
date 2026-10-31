import { describe, expect, it } from 'vitest';

import { KALORIJOS_ACTIVITIES } from '../constants/KalorijosActivities';

import { calculateDailyCalories, calculateMacros, type Gender } from './calculateCalories';

/*
 * Etalonai apskaičiuoti ranka pagal patikslintą Harris–Benedict formulę (Roza & Shizgal, 1984),
 * kurią naudojo ir ankstesnė skaičiuoklė:
 * Moteris 30 m., 165 cm, 60 kg: 447.593 + 9.247 × 60 + 3.098 × 165 − 4.330 × 30 = 1383.683
 * Vyras 30 m., 180 cm, 80 kg:    88.362 + 13.397 × 80 + 4.799 × 180 − 5.677 × 30 = 1853.632
 */
const WOMAN = { gender: 'Moteris' as Gender, age: '30', height: '165', weight: '60' };
const MAN = { gender: 'Vyras' as Gender, age: '30', height: '180', weight: '80' };

describe('calculateDailyCalories', () => {
	it('moters BMR', () => {
		expect(calculateDailyCalories({ ...WOMAN, ratio: 1 })).toBeCloseTo(1383.683, 6);
	});

	it('vyro BMR', () => {
		expect(calculateDailyCalories({ ...MAN, ratio: 1 })).toBeCloseTo(1853.632, 6);
	});

	// BMR × aktyvumo koeficientas (1.2 / 1.375 / 1.55 / 1.725 / 1.9), suapvalinta kaip rodoma ekrane.
	it.each([
		['Sėdimas darbas', 1660, 2224],
		['Lengvas aktyvumas', 1903, 2549],
		['Vidutinis aktyvumas', 2145, 2873],
		['Aukštas aktyvumas', 2387, 3198],
		['Labai aukštas aktyvumas', 2629, 3522],
	])('%s: moteriai %i kcal, vyrui %i kcal', (title, woman, man) => {
		const ratio = KALORIJOS_ACTIVITIES.find((activity) => activity.title === title)?.ratio ?? 0;
		expect(Math.round(calculateDailyCalories({ ...WOMAN, ratio }))).toBe(woman);
		expect(Math.round(calculateDailyCalories({ ...MAN, ratio }))).toBe(man);
	});

	it('grąžina 0, kai duomenys neįvesti ar neteisingi', () => {
		expect(calculateDailyCalories({ ...WOMAN, age: '', ratio: 1.55 })).toBe(0);
		expect(calculateDailyCalories({ ...WOMAN, height: '0', ratio: 1.55 })).toBe(0);
		expect(calculateDailyCalories({ ...WOMAN, weight: '-5', ratio: 1.55 })).toBe(0);
		expect(calculateDailyCalories({ ...WOMAN, weight: 'abc', ratio: 1.55 })).toBe(0);
	});
});

describe('calculateMacros', () => {
	it('20 / 45 / 35 % kalorijų, 4 / 4 / 9 kcal gramui', () => {
		expect(calculateMacros(2000)).toEqual([
			{ key: 'b', name: 'Baltymai', percent: 20, kcal: 400, grams: 100 },
			{ key: 'a', name: 'Angliavandeniai', percent: 45, kcal: 900, grams: 225 },
			{ key: 'r', name: 'Riebalai', percent: 35, kcal: 700, grams: expect.closeTo(77.78, 2) },
		]);
	});
});
