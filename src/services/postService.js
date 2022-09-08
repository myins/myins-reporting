import { axiosInstance } from './api';

export const getTotalPosts = async (type, startDate, endDate) => {
  return axiosInstance.get('/post/reporting/total', { 
    params: { 
      type,
      startDate,
      endDate
    }
  });
}
