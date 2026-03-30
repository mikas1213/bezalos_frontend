export function formatLTDate(isoString: Date): string {
	const date = new Date(isoString);

	const months = [
		'Sausio',
		'Vasario',
		'Kovo',
		'Balandžio',
		'Gegužės',
		'Birželio',
		'Liepos',
		'Rugpjūčio',
		'Rugsėjo',
		'Spalio',
		'Lapkričio',
		'Gruodžio',
	];

	const year = date.getFullYear();
	const month = months[date.getMonth()];
	const day = date.getDate();

	return `${month} ${day}, ${year}`;
}
