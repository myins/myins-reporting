import { axiosInstance } from './api';

export const getAvgGroupsPerUser = async () => {
  return axiosInstance.get('/ins/reporting/avg-groups-per-user');
}

export const getAvgGroupMembersPerGroup = async () => {
  return axiosInstance.get('/ins/reporting/avg-group-members-per-group');
}

export const getGroupsWithUsersCount = async () => {
  return axiosInstance.get('/ins/reporting/groups-with-users-count');
}

export const getUsersWithGroupsCount = async () => {
  return axiosInstance.get('/ins/reporting/users-with-groups-count');
}

export const getMostUsedWordsInInsesName = async (type, startDate, endDate) => {
  return axiosInstance.get('/ins/reporting/most-used-words', { 
    params: { 
      type,
      startDate,
      endDate 
    }
  });
}

export const getMostUsedWordsInChats = async (type, startDate, endDate) => {
  return axiosInstance.get('/chat/most-used-words', { 
    params: { 
      type,
      startDate,
      endDate 
    }
  });
}
