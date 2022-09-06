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
