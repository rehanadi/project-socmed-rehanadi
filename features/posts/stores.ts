import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostsState, Post } from './types';

const initialState: PostsState = {
  posts: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  hasMore: true,
  myPosts: [],
  myPostsPage: 1,
  myPostsLimit: 9,
  myPostsTotal: 0,
  myPostsTotalPages: 0,
  myPostsHasMore: true,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    appendPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...state.posts, ...action.payload];
    },
    setPagination: (
      state,
      action: PayloadAction<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      }>
    ) => {
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
      state.hasMore = state.posts.length < action.payload.total;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetPosts: (state) => {
      state.posts = [];
      state.page = 1;
      state.total = 0;
      state.totalPages = 0;
      state.hasMore = true;
    },
    setMyPosts: (state, action: PayloadAction<Post[]>) => {
      state.myPosts = action.payload;
    },
    appendMyPosts: (state, action: PayloadAction<Post[]>) => {
      state.myPosts = [...state.myPosts, ...action.payload];
    },
    setMyPostsPagination: (
      state,
      action: PayloadAction<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      }>
    ) => {
      state.myPostsPage = action.payload.page;
      state.myPostsLimit = action.payload.limit;
      state.myPostsTotal = action.payload.total;
      state.myPostsTotalPages = action.payload.totalPages;
      state.myPostsHasMore = state.myPosts.length < action.payload.total;
    },
    incrementMyPostsPage: (state) => {
      state.myPostsPage += 1;
    },
  },
});

export const {
  setPosts,
  appendPosts,
  setPagination,
  incrementPage,
  resetPosts,
  setMyPosts,
  appendMyPosts,
  setMyPostsPagination,
  incrementMyPostsPage,
} = postsSlice.actions;
export default postsSlice.reducer;