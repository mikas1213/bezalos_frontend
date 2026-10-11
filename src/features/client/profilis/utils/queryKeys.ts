/**
 * React Query raktai profilio feature'ei.
 * `all` leidžia vienu invalidate'u išvalyti visus profilio duomenis (pvz. atsijungus).
 */
export const profileKeys = {
	all: ['profile'] as const,
	profile: (userId: string | undefined) => ['profile', userId] as const,
	products: () => ['products'] as const,
};
