import { createDefaultAnketa } from '../constants/defaultAnketa';
import type { AnketaDto, AnketaForm, AnketaNumericField, AnketaTextField } from '../types';

const ANKETA_TEXT_FIELDS: AnketaTextField[] = [
	'feeding_desc',
	'health_problems_desc',
	'diet_desc',
	'intolerance_desc',
	'breakfast_desc',
	'lunch_desc',
	'snack_desc',
	'dinner_desc',
	'additional_info',
];

const ANKETA_NUMERIC_FIELDS: AnketaNumericField[] = ['age', 'height', 'weight', 'activity_steps'];

/**
 * DB eilutė → formos būsena: skaičiai į string (input'ų reikšmės), NULL tekstai į '',
 * be `id`, `created_at`, `updated_at`. Kai eilutės nėra, grąžinama tuščia forma.
 */
export const toAnketaForm = (row: AnketaDto | undefined): AnketaForm => {
	if (!row) {
		return createDefaultAnketa();
	}

	const textFields = Object.fromEntries(ANKETA_TEXT_FIELDS.map((field) => [field, row[field] ?? ''])) as Record<
		AnketaTextField,
		string
	>;
	const numericFields = Object.fromEntries(ANKETA_NUMERIC_FIELDS.map((field) => [field, String(row[field])])) as Record<
		AnketaNumericField,
		string
	>;

	return {
		user_id: row.user_id,
		gender: row.gender,
		goal: row.goal,
		schedule: row.schedule,
		feeding: row.feeding,
		health_problems: row.health_problems,
		diet: row.diet,
		intolerance: row.intolerance,
		breakfast: row.breakfast,
		breakfast_time: row.breakfast_time,
		lunch: row.lunch,
		lunch_time: row.lunch_time,
		snack: row.snack,
		snack_time: row.snack_time,
		dinner: row.dinner,
		dinner_time: row.dinner_time,
		routines: row.routines,
		...textFields,
		...numericFields,
	};
};
