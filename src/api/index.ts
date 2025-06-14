import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once, and only if token expired
    if (
      error.response?.status === 401 &&
      error.response.data?.message === "Token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // prevent infinite loop
      try {
        await api.get("/auth/refresh-token"); // refresh token
        return api(originalRequest); // retry original request
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        // Optional fallback: show modal, logout, or clear tokens
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // pass all other errors through
  },
);

export default api;
