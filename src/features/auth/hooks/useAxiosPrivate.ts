import type { AxiosInstance } from 'axios';
import { useLayoutEffect, useRef } from 'react';
import { useRefreshToken } from './useRefreshToken';
import { useAuth } from './useAuth';
import { axiosPrivate } from '../../../api/axios';

export const useAxiosPrivate = (): AxiosInstance => {
    const refresh = useRefreshToken();
    const { accessToken, logout } = useAuth();

    // Use refs to always get the latest values in interceptor callbacks
    const accessTokenRef = useRef<string | null>(accessToken);
    const refreshRef = useRef(refresh);
    const logoutRef = useRef(logout);

    // Keep refs in sync with latest values
    accessTokenRef.current = accessToken;
    refreshRef.current = refresh;
    logoutRef.current = logout;

    // Use useLayoutEffect to set up interceptors BEFORE other effects run
    useLayoutEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                const token = accessTokenRef.current;
                if(token && !config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            }, error => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                // aborted in useEffect cleanup
                if(error.code === "ERR_CANCELED") {
                    return Promise.resolve({status: 499})
                }

                const prevRequest = error?.config;

                // Don't retry refresh endpoint to avoid infinite loop
                const isRefreshRequest = prevRequest?.url?.includes('/auth/refresh');

                if(
                    (error?.response?.status === 401 || error?.response?.status === 403) &&
                    !prevRequest?.sent &&
                    !isRefreshRequest
                ) {
                    prevRequest.sent = true;

                    try {
                        const newAccessToken = await refreshRef.current();
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        // Refresh failed - user needs to login again
                        await logoutRef.current();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error)
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, []); // Empty deps - refs always have latest values

    return axiosPrivate;
};