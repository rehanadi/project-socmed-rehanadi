import { api } from '@/lib/api';
import {
  GetCommentsResponse,
  AddCommentPayload,
  AddCommentResponse,
  DeleteCommentResponse,
} from './types';
import {
  API_POSTS_URL,
  API_COMMENTS_URL,
} from '@/features/shared/constants/api-url';

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

  addComment: async (
    postId: number,
    payload: AddCommentPayload
  ): Promise<AddCommentResponse> => {
    const response = await api.post<AddCommentResponse>(
      `${API_POSTS_URL}/${postId}/comments`,
      payload
    );

    return response.data;
  },

  deleteComment: async (commentId: number): Promise<DeleteCommentResponse> => {
    const response = await api.delete<DeleteCommentResponse>(
      `${API_COMMENTS_URL}/${commentId}`
    );

    return response.data;
  },
};