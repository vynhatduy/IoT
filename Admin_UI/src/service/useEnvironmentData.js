import { useEffect, useState } from 'react';
import API from './useAPI';


const API_URL = import.meta.env.VITE_API_URL;

const useEnvironmentData = (area, from, to, fetchData) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!fetchData) return;

    const fetchDataFromAPI = async () => {
      try {
        const response = await API.get(
          `environment/dataByArea?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&area=${encodeURIComponent(area)}`
        );
        setData(response.data);
      } catch (err) {
        setData([]);
      }
    };

    fetchDataFromAPI();
  }, [fetchData, area, from, to]);

  return data;
};

export default useEnvironmentData;
