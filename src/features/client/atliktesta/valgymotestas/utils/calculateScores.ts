import { COOKIES, type CookieValues } from '../../../../../constants/cookies';
import type { AnswerMap, QuestionCategory, QuestionItem } from '../pages/types';

type CookieValue = CookieValues[typeof COOKIES.TEST_RESULT.name];

export const calculateScores = (questions: QuestionItem[], answers: AnswerMap) => {
	const scores: Record<QuestionCategory, number> = { E: 0, I: 0, A: 0 };
	const counts: Record<QuestionCategory, number> = { E: 0, I: 0, A: 0 };

	questions.forEach((q) => {
		if (answers[q.id]) {
			scores[q.category] += answers[q.id];
			counts[q.category]++;
		}
	});

	return {
		E: counts.E > 0 ? Number((scores.E / counts.E).toFixed(2)) : 0,
		I: counts.I > 0 ? Number((scores.I / counts.I).toFixed(2)) : 0,
		A: counts.A > 0 ? Number((scores.A / counts.A).toFixed(2)) : 0,
	};
};

const findDublicate = (arr: number[]) => {
	return arr.filter((reiksme, i) => {
		return arr.indexOf(reiksme) !== i;
	});
};

const resultMapper = (key: QuestionCategory): CookieValue => {
	const names: Record<QuestionCategory, CookieValue> = {
		E: COOKIES.TEST_RESULT.values.emocinis,
		I: COOKIES.TEST_RESULT.values.isorinis,
		A: COOKIES.TEST_RESULT.values.ribojantis,
	};
	return names[key];
};

export const getHighestScore = (scores: Record<QuestionCategory, number>): CookieValue => {
	const entries = Object.entries(scores);
	const values = entries.map(([_, value]) => value);

	// 1. Jeigu visi skaičiai < 2.5
	if (values.every((value) => value < 2.5)) {
		return COOKIES.TEST_RESULT.values.good;
	}

	// 2. Jeigu mažiausiai du skaičiai ≥ 3.5
	const highScores = values.filter((value) => value >= 3.5);
	if (highScores.length >= 2) {
		return COOKIES.TEST_RESULT.values.main;
	}

	// 3. Jeigu skaičiai >= 2.5 ir yra visi vienodi
	const uniqueValues = new Set(values);
	if (uniqueValues.size === 1) {
		return COOKIES.TEST_RESULT.values.main;
	}

	// 4. Jeigu mažiausiai du skaičiai vienodi
	const dublicateValue = findDublicate(values);
	const remainValue = values.filter((num) => num !== dublicateValue[0]);
	if (uniqueValues.size !== values.length && dublicateValue > remainValue) {
		return COOKIES.TEST_RESULT.values.main;
	}

	// 5. Grąžina kategorijos pavadinimą su didžiausia reikšme
	const maxValue = Math.max(...values);
	const key: CookieValue = entries.find(([_, value]) => value === maxValue)![0] as CookieValue;
	return resultMapper(key as QuestionCategory);
};
