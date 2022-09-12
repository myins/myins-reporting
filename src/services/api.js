import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://prod-api.myins.co.uk/',
});

export const setBearerToken = (user) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user?.accessToken}`
}
