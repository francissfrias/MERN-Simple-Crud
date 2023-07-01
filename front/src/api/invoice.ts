import { Invoice } from '../pages/Invoice/invoice-utils';
import { apiClient, apiEndpoints } from './services';

export interface IInvoice {
  id?: string;
  productName: string;
  productQuantity: number;
  productPrice: number;
}

type GetReturnType = {
  status: string;
  count: number;
  invoice: IInvoice[];
};

type GetOneReturnType = {
  status: string;
  invoice: IInvoice;
};

const getAll = async () => {
  const response = await apiClient.get<GetReturnType>(apiEndpoints.invoice);
  return response.data;
};

const getById = async (id: string) => {
  const response = await apiClient.get<GetOneReturnType>(
    `${apiEndpoints.invoice}/${id}`
  );
  return response.data;
};

const create = async (data: Invoice) => {
  const response = await apiClient.post<GetOneReturnType>(
    apiEndpoints.invoice,
    data
  );
  return response.data;
};

const update = async (id: string, data: Invoice) => {
  const response = await apiClient.put(`${apiEndpoints.invoice}/${id}`, data);
  return response.data;
};

const deleteOne = async (id: string) => {
  const response = await apiClient.delete(`${apiEndpoints.invoice}/${id}`);
  return response.data;
};

export const invoiceApi = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
