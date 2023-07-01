import axios, { AxiosRequestConfig } from 'axios';

export const apiEndpoints = {
  login: 'login',
  users: 'users',
  invoice: 'invoice',
};

const apiUrl = 'http://localhost:3000/';
const jwt = '273886a49f991c35a67932207effa2abcd3b766a61ae208b2fdd71b30f5619b3';

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const storedToken = localStorage.getItem('token');

    let _config = { ...config };

    if (storedToken) {
      _config = {
        ...config,
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      };
    }
    return _config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const loginApiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${jwt}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
