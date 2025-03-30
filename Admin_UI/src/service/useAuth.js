import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { saveAuthTokens } from "../utils/saveAuthTokens";

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
        { "username": email, "password": password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("response:", response);

      if (response.status !== 200 || !response.data.status) {
        throw new Error(response.data.message || "Đăng nhập thất bại.");
      }

      const { accessToken, refreshToken } = response.data.data; // Lấy từ `data.data`

      const decodedToken = jwtDecode(accessToken);
      const role = decodedToken?.role || "User";

      saveAuthTokens(accessToken, refreshToken.token, role); // Lưu token đúng cấu trúc

      setData(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, login };
};
