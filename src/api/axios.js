import axios from 'axios';

const baseURL = process.env.NODE_ENV === "production" ? "/api/v1" : "http://localhost:3003/api/v1";
export default axios.create({ baseURL });
