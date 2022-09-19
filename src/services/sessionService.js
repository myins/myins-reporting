import { axiosInstance } from './api';

export const getSessionDetails = async (type, startDate, endDate) => {
  return axiosInstance.get('/session', {
    params: { 
      type,
      startDate,
      endDate
    }
  });
}

export const getAvgWeeklyActiveUsers = async (type, startDate, endDate) => {
  return axiosInstance.get('/session/avg-weekly-active-user', {
    params: { 
      type,
      startDate,
      endDate
    }
  });
}
