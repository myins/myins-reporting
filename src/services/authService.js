import API from './api';

export const login = async (body) => {
  return API.post('auth/login', body);
}
