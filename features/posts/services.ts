import { api } from '@/lib/api';
import { API_POSTS_URL } from '@/features/shared/constants/api-url';
import { AddPostPayload, AddPostResponse } from './types';

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
};