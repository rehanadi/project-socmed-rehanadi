import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavesState, SavedPost } from './types';

const initialState: SavesState = {
  savedPosts: [],
  savedPostIds: [],
};

const savesSlice = createSlice({
  name: 'saves',
  initialState,
  reducers: {
    setSavedPosts: (state, action: PayloadAction<SavedPost[]>) => {
      state.savedPosts = action.payload;
      state.savedPostIds = action.payload.map((post) => post.id);
    },
    addSavedPost: (state, action: PayloadAction<SavedPost>) => {
      if (!state.savedPostIds.includes(action.payload.id)) {
        state.savedPosts.push(action.payload);
        state.savedPostIds.push(action.payload.id);
      }
    },
    removeSavedPost: (state, action: PayloadAction<number>) => {
      state.savedPosts = state.savedPosts.filter(
        (post) => post.id !== action.payload
      );
      state.savedPostIds = state.savedPostIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { setSavedPosts, addSavedPost, removeSavedPost } =
  savesSlice.actions;
export default savesSlice.reducer;