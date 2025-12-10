import { api } from '@/lib/api';
import {
  GetMyProfileResponse,
  GetUserProfileResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from './types';
import {
  API_ME_URL,
  API_USERS_URL,
} from '@/features/shared/constants/api-url';

export const usersService = {
  getMyProfile: async (): Promise<GetMyProfileResponse> => {
    const response = await api.get<GetMyProfileResponse>(API_ME_URL);

    return response.data;
  },

  getUserProfile: async (
    username: string
  ): Promise<GetUserProfileResponse> => {
    const response = await api.get<GetUserProfileResponse>(
      `${API_USERS_URL}/${username}`
    );

    return response.data;
  },

  updateProfile: async (
    payload: UpdateProfilePayload
  ): Promise<UpdateProfileResponse> => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('username', payload.username);
    formData.append('phone', payload.phone);
    formData.append('bio', payload.bio);

    if (payload.avatar) {
      formData.append('avatar', payload.avatar);
    }

    const response = await api.patch<UpdateProfileResponse>(
      API_ME_URL,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },
};