import { api } from '@/lib/api';
import {
  GetSavesResponse,
  SavePostResponse,
  UnsavePostResponse,
} from './types';
import {
  API_POSTS_URL,
  API_ME_URL,
} from '@/features/shared/constants/api-url';

export const savesService = {
  getSaves: async (page: number, limit: number): Promise<GetSavesResponse> => {
    const response = await api.get<GetSavesResponse>(
      `${API_ME_URL}/saved?page=${page}&limit=${limit}`
    );

    return response.data;
  },

  addSave: async (postId: number): Promise<SavePostResponse> => {
    const response = await api.post<SavePostResponse>(
      `${API_POSTS_URL}/${postId}/save`
    );

    return response.data;
  },

  deleteSave: async (postId: number): Promise<UnsavePostResponse> => {
    const response = await api.delete<UnsavePostResponse>(
      `${API_POSTS_URL}/${postId}/save`
    );

    return response.data;
  },
};