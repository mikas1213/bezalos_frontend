import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:3003/api/v1';

// Public instance — no cookies, no auth header
// Use for: signup, forgot-password, reset-password
export const axiosPublic = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
});

// Private instance — sends cookies, interceptors attached in AuthProvider
// Use for: all authenticated requests
export const axiosPrivate = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 1800000, // 30 minutes (needed for large S3 video uploads)
    withCredentials: true,
});
