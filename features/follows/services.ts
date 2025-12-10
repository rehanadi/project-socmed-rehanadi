import { api } from '@/lib/api';
import {
  FollowResponse,
  UnfollowResponse,
  GetFollowersResponse,
  GetFollowingResponse,
} from './types';
import {
  API_FOLLOW_URL,
  API_USERS_URL,
} from '@/features/shared/constants/api-url';

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

  getFollowers: async (
    username: string,
    page: number,
    limit: number
  ): Promise<GetFollowersResponse> => {
    const response = await api.get<GetFollowersResponse>(
      `${API_USERS_URL}/${username}/followers?page=${page}&limit=${limit}`
    );

    return response.data;
  },

  getFollowing: async (
    username: string,
    page: number,
    limit: number
  ): Promise<GetFollowingResponse> => {
    const response = await api.get<GetFollowingResponse>(
      `${API_USERS_URL}/${username}/following?page=${page}&limit=${limit}`
    );

    return response.data;
  },
};