import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const useEnvironmentData = (area: string, from: string, to: string, fetchData: boolean) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!fetchData) return; // Chỉ gọi API khi fetchData = true

    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          `${API_URL}environment/dataByArea?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&area=${encodeURIComponent(area)}`
        );
        setData(response.data);
      } catch {
        setData([]); // Lỗi thì trả về mảng rỗng
      }
    };

    fetchDataFromAPI();
  }, [fetchData, area, from, to]);

  return data; // Chỉ trả về dữ liệu, không có trạng thái loading/error
};

export default useEnvironmentData;
