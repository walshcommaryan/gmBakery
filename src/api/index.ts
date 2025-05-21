import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Your Express BE base path
  withCredentials: true,               // Only if using cookies/auth
});

export default api;
