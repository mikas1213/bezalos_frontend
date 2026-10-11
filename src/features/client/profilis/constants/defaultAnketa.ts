import type { AnketaForm, Routine } from '../types';

/** Reikšmė, kai laikas dar nepasirinktas. Tokia pati kaip DB stulpelių DEFAULT. */
export const EMPTY_TIME = '--:--';

/**
 * Nauja tuščia dienos rutina su unikaliu day_id.
 * `crypto.randomUUID()` generuoja tą patį v4 UUID kaip `uuid` paketas, bet be papildomos priklausomybės
 * (uuid@9 neturi tipų, o @types/uuid projekte nėra).
 */
export const createRoutine = (): Routine => ({
	day_id: crypto.randomUUID(),
	eat: 'Galiu valgyti betkada',
	get_up: EMPTY_TIME,
	go_sleep: EMPTY_TIME,
	sport: EMPTY_TIME,
	breakfast_time: EMPTY_TIME,
	lunch_time: EMPTY_TIME,
	snack_time: EMPTY_TIME,
	dinner_time: EMPTY_TIME,
});

/**
 * Tuščia anketos forma vartotojui, kuris jos dar nepildė.
 * Fabrikas, o ne konstanta, kad kiekvienas kvietimas gautų naujus routine day_id.
 */
export const createDefaultAnketa = (): AnketaForm => ({
	gender: 'Moteris',
	age: '',
	height: '',
	weight: '',
	activity_steps: '',
	goal: '',
	schedule: '',
	feeding: false,
	feeding_desc: '',
	health_problems: false,
	health_problems_desc: '',
	diet: false,
	diet_desc: '',
	intolerance: false,
	intolerance_desc: '',
	breakfast: false,
	breakfast_time: EMPTY_TIME,
	breakfast_desc: '',
	lunch: false,
	lunch_time: EMPTY_TIME,
	lunch_desc: '',
	snack: false,
	snack_time: EMPTY_TIME,
	snack_desc: '',
	dinner: false,
	dinner_time: EMPTY_TIME,
	dinner_desc: '',
	routines: {
		workday: [createRoutine()],
		day_off: [createRoutine()],
	},
	additional_info: '',
});
