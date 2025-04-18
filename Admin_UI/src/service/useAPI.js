import axios from 'axios';
import { saveAuthTokens } from '../utils/saveAuthTokens';
const BASEURL = import.meta.env.VITE_API_URL;
const API = axios.create({
  baseURL: BASEURL
});

API.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

API.interceptors.request.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post(`${BASEURL}auth/refresh-token`, {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken
        });
        const newAccessToken = res.data.data.accessToken;

        saveAuthTokens(newAccessToken, res.data.data.refreshToken.token);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
export default API;
