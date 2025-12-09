import { api } from '@/lib/api';
import { API_POSTS_URL, API_FEED_URL } from '@/features/shared/constants/api-url';
import {
  AddPostPayload,
  AddPostResponse,
  GetFeedResponse,
  DeletePostResponse,
} from './types';

export const postsService = {
  addPost: async (payload: AddPostPayload): Promise<AddPostResponse> => {
    const formData = new FormData();
    formData.append('image', payload.image);
    formData.append('caption', payload.caption);

    const response = await api.post<AddPostResponse>(API_POSTS_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  getFeed: async (page: number, limit: number): Promise<GetFeedResponse> => {
    const response = await api.get<GetFeedResponse>(
      `${API_FEED_URL}?page=${page}&limit=${limit}`
    );

    return response.data;
  },

  deletePost: async (postId: number): Promise<DeletePostResponse> => {
    const response = await api.delete<DeletePostResponse>(
      `${API_POSTS_URL}/${postId}`
    );

    return response.data;
  },
};