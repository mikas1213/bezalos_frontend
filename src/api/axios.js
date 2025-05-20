import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:3003/api/v1';

export default axios.create({ baseURL });

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: { 
        'Content-Type': 'application/json',
        // 'Accept': 'application/json', 
        // 'Accept-Language': 'lt-LT,lt',
        // 'Cache-Control': 'no-cache',
        // 'Pragma': 'no-cache',
        // 'Expires': '0'
    },
    withCredentials: true
});