import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentsState, Comment } from './types';

const initialState: CommentsState = {
  commentsByPostId: {},
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (
      state,
      action: PayloadAction<{ postId: number; comments: Comment[] }>
    ) => {
      const { postId, comments } = action.payload;
      if (!state.commentsByPostId[postId]) {
        state.commentsByPostId[postId] = {
          comments: [],
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasMore: true,
        };
      }
      state.commentsByPostId[postId].comments = comments;
    },
    appendComments: (
      state,
      action: PayloadAction<{ postId: number; comments: Comment[] }>
    ) => {
      const { postId, comments } = action.payload;
      if (state.commentsByPostId[postId]) {
        state.commentsByPostId[postId].comments = [
          ...state.commentsByPostId[postId].comments,
          ...comments,
        ];
      }
    },
    setCommentsPagination: (
      state,
      action: PayloadAction<{
        postId: number;
        pagination: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      }>
    ) => {
      const { postId, pagination } = action.payload;
      if (state.commentsByPostId[postId]) {
        state.commentsByPostId[postId].page = pagination.page;
        state.commentsByPostId[postId].limit = pagination.limit;
        state.commentsByPostId[postId].total = pagination.total;
        state.commentsByPostId[postId].totalPages = pagination.totalPages;
        state.commentsByPostId[postId].hasMore =
          state.commentsByPostId[postId].comments.length < pagination.total;
      }
    },
    incrementCommentsPage: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      if (state.commentsByPostId[postId]) {
        state.commentsByPostId[postId].page += 1;
      }
    },
    resetComments: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      delete state.commentsByPostId[postId];
    },
  },
});

export const {
  setComments,
  appendComments,
  setCommentsPagination,
  incrementCommentsPage,
  resetComments,
} = commentsSlice.actions;
export default commentsSlice.reducer;