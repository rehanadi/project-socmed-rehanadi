import { api } from '@/lib/api';
import { GetMyProfileResponse } from './types';
import { API_ME_URL } from '@/features/shared/constants/api-url';

export const usersService = {
  getMyProfile: async (): Promise<GetMyProfileResponse> => {
    const response = await api.get<GetMyProfileResponse>(API_ME_URL);

    return response.data;
  },
};