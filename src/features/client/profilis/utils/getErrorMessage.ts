import { isAxiosError } from 'axios';

/** Backend'o klaidos atsakymai visur turi formą `{ message }`. */
interface ApiErrorBody {
	message?: unknown;
}

/**
 * Ištraukia žmogui skirtą tekstą iš axios, `Error` arba nežinomos klaidos.
 * Tinklo klaidai (kai `response` nėra) grąžina axios `message`, todėl nenulūžta kaip `err.response.data.message`.
 */
export const getErrorMessage = (error: unknown, fallback = 'Nežinoma klaida'): string => {
	if (isAxiosError<ApiErrorBody>(error)) {
		const message = error.response?.data?.message;
		return typeof message === 'string' && message.length > 0 ? message : error.message;
	}
	if (error instanceof Error) {
		return error.message;
	}
	return fallback;
};
