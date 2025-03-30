import { useEffect, useState } from 'react';
import API from './useAPI';
const API_URL = import.meta.env.VITE_API_URL;
const useTotalEnvironmentData = (yesterday, today) => {
  const [data, setData] = useState({ yesterdayData: null, todayData: null, loading: true, error: null });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const yesterdayResponse = await API.get(`environment/totalDataByDate?date=${yesterday}`);
        const todayResponse = await API.get(`environment/totalDataByDate?date=${today}`);

        setData({
          yesterdayData: yesterdayResponse.data,
          todayData: todayResponse.data,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching environment data:', error);
        setData({ yesterdayData: null, todayData: null, loading: false, error });
      }
    };
    fetchData();
  }, [yesterday, today]);

  return data;
};
export default useTotalEnvironmentData;
