import { api } from '@/lib/api';
import { FollowResponse, UnfollowResponse } from './types';
import { API_FOLLOW_URL } from '@/features/shared/constants/api-url';

export const followsService = {
  addFollow: async (username: string): Promise<FollowResponse> => {
    const response = await api.post<FollowResponse>(
      `${API_FOLLOW_URL}/${username}`
    );

    return response.data;
  },

  deleteFollow: async (username: string): Promise<UnfollowResponse> => {
    const response = await api.delete<UnfollowResponse>(
      `${API_FOLLOW_URL}/${username}`
    );

    return response.data;
  },
};