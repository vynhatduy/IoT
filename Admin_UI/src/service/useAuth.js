import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { saveAuthTokens } from '../utils/saveAuthTokens';

const API_URL = import.meta.env.VITE_API_URL;

export const useLogin = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}auth/login`,
        { username: email, password: password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('response:', response);

      if (response.status !== 200 || !response.data.status) {
        throw new Error(response.data.message || 'Đăng nhập thất bại.');
      }

      const { accessToken, refreshToken } = response.data.data; // Lấy từ `data.data`

      const decodedToken = jwtDecode(accessToken);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'User';

      // Kiểm tra role, nếu là User thì báo lỗi và return null ngay
      if (role === 'User') {
        setError('Tài khoản của bạn không có quyền truy cập hệ thống.');
        setData(null);
        return null;
      }

      // Nếu không phải User thì lưu token và tiếp tục
      saveAuthTokens(accessToken, refreshToken.token, role);

      setData(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Đăng nhập thất bại.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, login };
};

export const useCreateAdmin = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createAdmin = async (userData) => {
    if (!userData || !userData.firstName || !userData.lastName || !userData.email || !userData.password) {
      setError('Tất cả các trường đều bắt buộc.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}user/admin/create`, userData, { headers: { 'Content-Type': 'application/json' } });

      if (response.status !== 200 || !response.data.status) {
        setError(response.data.message || 'Tạo quản trị viên thất bại.');
      }

      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Tạo quản trị viên thất bại.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, createAdmin };
};
