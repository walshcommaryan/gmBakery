import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2000/api/v1/', // Your Express BE base path
  withCredentials: true,               // Only if using cookies/auth
});

export default api;
