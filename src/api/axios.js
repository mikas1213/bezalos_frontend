import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:3003/api/v1';

export default axios.create({ baseURL });

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: { 
        // 'Content-Type': 'application/josn',  
        // 'Access-Control-Allow-Origin': '*',
        // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin"
        
    },
    withCredentials: true
});