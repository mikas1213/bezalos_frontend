/**
 * Profilio (/profile/*) API tipai.
 *
 * Laukų pavadinimai ir tipai paimti iš backend'o:
 * - backend/Models/User.js → getUserDetailsQuery() (GET /profile/:id)
 * - backend/controllers/profileController.js (likę endpoint'ai)
 * - backend/bezalos-db-schema.sql (stulpelių tipai)
 *
 * Visi id yra UUID, todėl visur `string`.
 */

/** Valgio makro logika: kurios dvi makromedžiagos derinamos. */
export type MacroLogic = 'A+B' | 'B+R' | 'A+R';

/** '-' reiškia „be logikos“: sporto valgis arba receptas be pasirinkto valgio. */
export type FoodLogic = MacroLogic | '-';

/* -------------------------------------------------------------------------- */
/* Produktai: GET /profile/products                                           */
/* -------------------------------------------------------------------------- */

/** Bendras produktų sąrašas (food_products). Naudojamas keitykloje, plano keitimuose ir receptuose. */
export interface Product {
	id: string;
	title: string;
	/** Baltymai 100 g */
	proteins: number;
	/** Angliavandeniai 100 g */
	carbs: number;
	/** Riebalai 100 g */
	fat: number;
	category: string;
	sub_category: string;
	food_type: string;
}

/* -------------------------------------------------------------------------- */
/* Mitybos planai: GET /profile/:id → plans                                   */
/* -------------------------------------------------------------------------- */

/**
 * Produktas vartotojo plano valgyje (user_products).
 * Makro laukai čia vadinasi kitaip nei `Product`: b_100 / a_100 / r_100.
 */
export interface PlanProduct {
	id: string;
	/** Backend'as čia grąžina tą patį UUID kaip `id`. */
	product_id: string;
	title: string;
	category: string;
	sub_category: string;
	b_100: number;
	a_100: number;
	r_100: number;
	grams: number;
}

export interface Meal {
	id: string;
	/** Tas pats UUID kaip `id`. */
	meal_id: string;
	title: string;
	logic: FoodLogic;
	intolerance: string | null;
	is_sport: boolean;
	meal_time: string;
	/** Sumos sveikais skaičiais. Sporto „valgis“ produktų neturi, todėl jam grąžinamas null. */
	b: number | null;
	a: number | null;
	r: number | null;
	kcal: number | null;
	products: PlanProduct[];
}

export interface UserPlan {
	id: string;
	title: string;
	/** Viso plano sumos sveikais skaičiais. */
	b: number;
	a: number;
	r: number;
	kcal: number;
	meals: Meal[];
}

/* -------------------------------------------------------------------------- */
/* Vartotojo receptai: GET /profile/:id → recipes, POST/DELETE /profile/new-recipe */
/* -------------------------------------------------------------------------- */

export interface UserRecipeProduct {
	id: string;
	/** Nuoroda į food_products.id */
	product_id: string;
	title: string;
	proteins: number;
	carbs: number;
	fat: number;
	grams: number;
}

export interface UserRecipe {
	id: string;
	title: string;
	logic: FoodLogic;
	b: number;
	a: number;
	r: number;
	kcal: number;
	products: UserRecipeProduct[];
}

/** Produktas naujo recepto kūne. Backend'as naudoja tik šiuos laukus, papildomi ignoruojami. */
export type NewRecipeProduct = Omit<UserRecipeProduct, 'id'>;

/** POST /profile/new-recipe/:userId kūnas. */
export interface NewRecipePayload {
	title: string;
	logic: FoodLogic;
	products: NewRecipeProduct[];
}

export interface NewRecipeResponse {
	recipe_id: string;
}

/**
 * Ką RecipeModal paduoda `useCreateRecipe`: payload + kliento suskaičiuotos sumos ir laikini produktų id,
 * kad naują receptą būtų galima įdėti į cache be papildomo refetch'o.
 */
export interface CreateRecipeInput extends NewRecipePayload {
	products: Array<NewRecipeProduct & { id?: string }>;
	b: number;
	a: number;
	r: number;
	kcal: number;
}

/* -------------------------------------------------------------------------- */
/* Anketa: GET /profile/:id → anketa[0], POST /profile/anketa/:userId         */
/* -------------------------------------------------------------------------- */

export type Gender = 'Moteris' | 'Vyras';

export type EatAnytime = 'Galiu valgyti betkada' | 'Negaliu valgyti betkada';

/** Vienos dienos rutina. Laikai yra 'HH:MM' arba '--:--', kai nepasirinkta. */
export interface Routine {
	day_id: string;
	eat: EatAnytime;
	get_up: string;
	go_sleep: string;
	sport: string;
	breakfast_time: string;
	lunch_time: string;
	snack_time: string;
	dinner_time: string;
}

export interface AnketaRoutines {
	workday: Routine[];
	day_off: Routine[];
}

/** Laukai, kurie vienodi ir DB eilutėje, ir formoje. */
interface AnketaCommon {
	gender: Gender;
	goal: string;
	schedule: string;
	feeding: boolean;
	health_problems: boolean;
	diet: boolean;
	intolerance: boolean;
	breakfast: boolean;
	breakfast_time: string;
	lunch: boolean;
	lunch_time: string;
	snack: boolean;
	snack_time: string;
	dinner: boolean;
	dinner_time: string;
	routines: AnketaRoutines;
}

/** Laisvo teksto laukai: DB jie gali būti NULL, formoje visada string. */
export type AnketaTextField =
	| 'feeding_desc'
	| 'health_problems_desc'
	| 'diet_desc'
	| 'intolerance_desc'
	| 'breakfast_desc'
	| 'lunch_desc'
	| 'snack_desc'
	| 'dinner_desc'
	| 'additional_info';

/** Skaitiniai laukai: DB jie number, formoje string (input'ų reikšmės, leidžiamas kablelis). */
export type AnketaNumericField = 'age' | 'height' | 'weight' | 'activity_steps';

/** Eilutė iš DB, kaip ją grąžina JSON_AGG(a.*) backend/Models/User.js. */
export type AnketaDto = AnketaCommon &
	Record<AnketaTextField, string | null> &
	Record<AnketaNumericField, number> & {
		id: string;
		user_id: string;
		created_at: string;
		updated_at: string;
	};

/**
 * Formos būsena AnketaPage ir POST /profile/anketa/:userId kūnas.
 * `user_id` yra tik tada, kai anketa jau buvo išsaugota (pagal jį parenkamas toast'o tekstas).
 */
export type AnketaForm = AnketaCommon &
	Record<AnketaTextField, string> &
	Record<AnketaNumericField, string> & {
		user_id?: string;
	};

/* -------------------------------------------------------------------------- */
/* GET /profile/:id                                                           */
/* -------------------------------------------------------------------------- */

export interface ProfileOrder {
	id: string;
	user_id: string;
	title: string | null;
	price: string | null;
	created_at: string;
}

/**
 * Viena eilutė iš getUserDetailsQuery(). Backend'as grąžina masyvą su viena eilute,
 * `profileService.getProfile()` jį išpakuoja.
 */
export interface ProfileDto {
	id: string;
	name: string | null;
	email: string;
	stripe_username: string | null;
	/** Data 'YYYY-MM-DD' arba null, jei planas dar nepriskirtas. */
	plan_assign: string | null;
	subscription_type: string;
	initial_target: string;
	orders: ProfileOrder[];
	plans: UserPlan[];
	recipes: UserRecipe[];
	/** Tuščias masyvas, kol anketa nepildyta; kitaip vienas įrašas. */
	anketa: AnketaDto[];
	/** Kūno apimčių suvestinė. Bus tipizuota kartu su StatistikaPage refaktoringu. */
	apimtys: unknown[];
}

/** Normalizuotas profilis kliento pusei: `useProfile` select rezultatas. */
export interface ProfileData {
	plans: UserPlan[];
	recipes: UserRecipe[];
	/** Jau formos pavidalu; tuščia forma, kai anketa dar nepildyta. */
	anketa: AnketaForm;
}
