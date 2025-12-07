import { http } from '@/lib/api';
import { API_AUTH_URL } from '@/features/shared/constants/api-url';
import { RegisterPayload, RegisterResponse, LoginPayload, LoginResponse } from './types';

export const authService = {
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    return http.post<RegisterResponse>(`${API_AUTH_URL}/register`, payload);
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    return http.post<LoginResponse>(`${API_AUTH_URL}/login`, payload);
  },
};