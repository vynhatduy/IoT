import { useEffect, useState } from 'react';
import API from './useAPI';

const API_URL = import.meta.env.VITE_API_URL;

export const useEnvironmentData = (area, from, to, fetchData) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!fetchData || !area || !from || !to) return;

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

export const useEnvironmentDataLatestByArea = (areaId) => {
  const [dataEnvironment, setDataEnvironment] = useState([]);
  const [dataEnvironmentLoading, setDataEnvironmentLoading] = useState(true);
  const [dataEnvironmentError, setDataEnvironmentError] = useState(null);
  useEffect(() => {
    if (!areaId) return;
    const fetchData = async () => {
      try {
        const response = await API.get(`environment/latest?area=${areaId}`);
        setDataEnvironment(response.data);
      } catch (err) {
        setDataEnvironment([]);
        setDataEnvironmentError(err);
      } finally {
        setDataEnvironmentLoading(false);
      }
    };
    fetchData();
  }, [areaId]);
  return { dataEnvironment, dataEnvironmentLoading, dataEnvironmentError };
};
