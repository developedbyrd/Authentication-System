import axios from "axios";

const BaseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: `${BaseURL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
