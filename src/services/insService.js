import { axiosInstance } from './api';

export const groupsWithUsersCount = async () => {
  return axiosInstance.get('/ins/reporting/groups-with-users-count');
}

export const usersWithGroupsCount = async () => {
  return axiosInstance.get('/ins/reporting/users-with-groups-count');
}
