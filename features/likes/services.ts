import { api } from '@/lib/api';
import {
  LikePostResponse,
  UnlikePostResponse,
  GetUserLikesResponse,
} from './types';
import { API_POSTS_URL } from '@/features/shared/constants/api-url';

export const likesService = {
  addLike: async (postId: number): Promise<LikePostResponse> => {
    const response = await api.post<LikePostResponse>(
      `${API_POSTS_URL}/${postId}/like`
    );

    return response.data;
  },

  deleteLike: async (postId: number): Promise<UnlikePostResponse> => {
    const response = await api.delete<UnlikePostResponse>(
      `${API_POSTS_URL}/${postId}/like`
    );

    return response.data;
  },

  getUserLikes: async (
    username: string,
    page: number,
    limit: number
  ): Promise<GetUserLikesResponse> => {
    const response = await api.get<GetUserLikesResponse>(
      `/api/users/${username}/likes?page=${page}&limit=${limit}`
    );

    return response.data;
  },
};