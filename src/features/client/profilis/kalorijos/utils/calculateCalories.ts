export type Gender = 'Moteris' | 'Vyras';

export type MacroKey = 'b' | 'a' | 'r';

export interface MacroResult {
	key: MacroKey;
	name: string;
	percent: number;
	grams: number;
	kcal: number;
}

interface CaloriesInput {
	gender: Gender;
	/** Įvesties laukų reikšmės – skaičius gali būti su kableliu. */
	age: string;
	height: string;
	weight: string;
	ratio: number;
}

/**
 * Harris–Benedict (patikslinta 1984 m.):
 * Moterims: BMR = 447.593 + 9.247 × svoris + 3.098 × ūgis − 4.330 × amžius
 * Vyrams:   BMR = 88.362 + 13.397 × svoris + 4.799 × ūgis − 5.677 × amžius
 */
const HARRIS_BENEDICT: Record<Gender, { constant: number; weight: number; height: number; age: number }> = {
	Moteris: { constant: 447.593, weight: 9.247, height: 3.098, age: 4.33 },
	Vyras: { constant: 88.362, weight: 13.397, height: 4.799, age: 5.677 },
};

/** Makroelementų dalis nuo dienos kalorijų ir kcal viename grame. */
const MACRO_SPLIT: { key: MacroKey; name: string; percent: number; kcalPerGram: number }[] = [
	{ key: 'b', name: 'Baltymai', percent: 20, kcalPerGram: 4 },
	{ key: 'a', name: 'Angliavandeniai', percent: 45, kcalPerGram: 4 },
	{ key: 'r', name: 'Riebalai', percent: 35, kcalPerGram: 9 },
];

const toNumber = (value: string) => Number(value.replace(',', '.'));

/** Dienos kalorijų poreikis. Kai duomenys neįvesti ar neteisingi – 0. */
export const calculateDailyCalories = ({ gender, age, height, weight, ratio }: CaloriesInput): number => {
	const [a, h, w] = [toNumber(age), toNumber(height), toNumber(weight)];
	if (![a, h, w].every((n) => Number.isFinite(n) && n > 0)) {
		return 0;
	}
	const f = HARRIS_BENEDICT[gender];
	const bmr = f.constant + f.weight * w + f.height * h - f.age * a;
	return bmr > 0 ? bmr * ratio : 0;
};

export const calculateMacros = (kcal: number): MacroResult[] =>
	MACRO_SPLIT.map(({ key, name, percent, kcalPerGram }) => {
		const macroKcal = (kcal * percent) / 100;
		return { key, name, percent, kcal: macroKcal, grams: macroKcal / kcalPerGram };
	});
