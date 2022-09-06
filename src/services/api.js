import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
});

export const setBearerToken = (user) => {
  console.log('SET BEARER TOKEN')
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user?.accessToken}`
}
