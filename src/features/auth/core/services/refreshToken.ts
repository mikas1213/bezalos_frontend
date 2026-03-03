import { authService } from './AuthService';
import type { UserData } from './types';

// Module-level promise to deduplicate concurrent refresh calls
let refreshPromise: Promise<string> | null = null;

/**
 * Creates a refresh function bound to auth state setters from AuthProvider.
 * Deduplicates concurrent refresh calls — only one request is made at a time.
 */
export const createRefreshFn = (
    setAccessToken: (token: string) => void,
    setUser: (user: UserData) => void,
) => async (): Promise<string> => {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = authService
        .refresh()
        .then((response) => {
            setAccessToken(response.accessToken);
            setUser(response.user);
            return response.accessToken;
        })
        .finally(() => {
            refreshPromise = null;
        });

    return refreshPromise;
};
