import { apiClient, apiEndpoints, loginApiClient } from './services';

export interface IUser {
  id?: string | undefined;
  email: string;
  password: string;
}

type GetReturnType = {
  status: string;
  count: number;
  user: IUser[];
};

type GetOneReturnType = {
  status: string;
  user: IUser;
};

const getAll = async () => {
  const response = await apiClient.get<GetReturnType>(apiEndpoints.users);
  return response.data;
};

const getById = async (id: string) => {
  const response = await apiClient.get<GetOneReturnType>(
    `apiEndpoints.users/${id}`
  );
  return response.data;
};
const login = async ({ email, password }: IUser) => {
  const response = await loginApiClient.post(apiEndpoints.login, {
    email,
    password,
  });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data;
};

const register = async ({ email, password }: IUser) => {
  const response = await apiClient.post(apiEndpoints.users, {
    email,
    password,
  });
  return response.data;
};

const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const authApi = { getAll, getById, login, register, logout };
