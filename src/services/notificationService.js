import { axiosInstance } from './api';

export const getNotifications = async (type, startDate, endDate) => {
  return axiosInstance.get('/notification/reporting', { 
    params: { 
      type,
      startDate,
      endDate
    }
  });
}
