import { api } from '@/lib/api';
import { GetCommentsResponse } from './types';

const API_POSTS_URL = '/api/posts';

export const commentsService = {
  getComments: async (
    postId: number,
    page: number,
    limit: number
  ): Promise<GetCommentsResponse> => {
    const response = await api.get<GetCommentsResponse>(
      `${API_POSTS_URL}/${postId}/comments?page=${page}&limit=${limit}`
    );

    return response.data;
  },
};