import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export function useUserGetAll() {
  return useQuery({
    queryKey: ['users'],
    queryFn: authApi.getAll,
  });
}

export function useUserGetById(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => authApi.getById(id),
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(authApi.register, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      navigate('/login');
    },
  });
}
