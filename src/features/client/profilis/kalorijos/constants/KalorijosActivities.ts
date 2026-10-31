export type ActivityId = 1 | 2 | 3 | 4 | 5;

export interface KalorijosActivity {
	id: ActivityId;
	icon: string;
	title: string;
	description: string;
	/** Aktyvumo koeficientas, kuriuo dauginamas bazinis medžiagų apykaitos greitis (BMR). */
	ratio: number;
}

/** Aktyvumo lygiai kalorijų skaičiuoklėje. */
export const KALORIJOS_ACTIVITIES: KalorijosActivity[] = [
	{ id: 1, icon: '🪑', title: 'Sėdimas darbas', description: 'Mažai arba visai nejudama', ratio: 1.2 },
	{ id: 2, icon: '🚶', title: 'Lengvas aktyvumas', description: '1–2 treniruotės per savaitę', ratio: 1.375 },
	{ id: 3, icon: '🏃', title: 'Vidutinis aktyvumas', description: '3–5 treniruotės per savaitę', ratio: 1.55 },
	{ id: 4, icon: '🏋️', title: 'Aukštas aktyvumas', description: '6–7 treniruotės per savaitę', ratio: 1.725 },
	{ id: 5, icon: '⚡️', title: 'Labai aukštas aktyvumas', description: 'Intensyvios treniruotės 2× per dieną', ratio: 1.9 },
];
