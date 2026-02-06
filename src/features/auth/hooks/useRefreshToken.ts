import { useAuth } from "./useAuth";
import { authService } from "../services/AuthService";
import type { UserData } from "../services/AuthService";

export interface RefreshResponse {
    accessToken: string;
    user: UserData;
}

let refreshPromise: Promise<string> | null = null;
export const useRefreshToken = (): (() => Promise<string>) => {
    const { setAccessToken, setUser } = useAuth();

    const refresh = async (): Promise<string> => {
        // If a refresh is already in progress, wait for it
        if (refreshPromise) {
            return refreshPromise;
        }

        refreshPromise = authService.refresh()
            .then((response: RefreshResponse) => {
                setAccessToken(response.accessToken);
                setUser(response.user);
                return response.accessToken;
            })
            .finally(() => {
                refreshPromise = null;
            });

        return refreshPromise;
    };

    return refresh;
};
