import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IInvoice, invoiceApi } from '../api/invoice';
import { useNavigate, useParams } from 'react-router-dom';
import { Invoice } from '../pages/Invoice/invoice-utils';

export function useInvoiceGetAll() {
  return useQuery({
    queryKey: ['invoice'],
    queryFn: invoiceApi.getAll,
  });
}

export function useInvoiceGetById() {
  const { id } = useParams<{ id: string }>();

  return useQuery({
    queryKey: ['invoiceId', id],
    queryFn: () => invoiceApi.getById(id!),
  });
}

// mutation

export function useCreateInvoice() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(invoiceApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['invoice']);
      navigate('/invoice');
    },
  });
}

export function useUpdateInvoice() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  return useMutation((data: Invoice) => invoiceApi.update(id!, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['invoice', id]);
      navigate('/invoice');
      // Invalidate the 'invoice' query with the specific ID
    },
  });
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation(invoiceApi.deleteOne, {
    onSuccess: () => {
      queryClient.invalidateQueries(['invoice']);
    },
  });
}
