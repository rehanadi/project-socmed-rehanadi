import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authService } from './services';
import { RegisterPayload, LoginPayload } from './types';
import { getErrorMessage } from '@/lib/api';

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: () => {
      toast.success('Registration successful!');
      router.push('/login');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.data.token);
      }
      
      toast.success('Login successful!');
      router.push('/');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};