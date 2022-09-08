import { axiosInstance } from './api';

export const getNotifications = async (type, startDate, endDate, from) => {
  return axiosInstance.get('/notification/reporting', { 
    params: { 
      type,
      startDate,
      endDate
    }
  });
}
