/** First letters of the first two words, e.g. "Sandra Jatulytė" → "SJ". */
export const initials = (name: string): string =>
	name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((word) => word[0] ?? '')
		.join('')
		.toUpperCase();
