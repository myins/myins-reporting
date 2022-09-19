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

export const getPercentDisplayOfAllPostsRes = async (type, startDate, endDate) => {
  return axiosInstance.get('/post/reporting/percent-display-of-all-posts', { 
    params: { 
      type,
      startDate,
      endDate
    }
  });
}
