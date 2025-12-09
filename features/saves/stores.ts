import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavesState, SavedPost } from './types';

const SAVES_STORAGE_KEY = 'savedPosts';

// Load from localStorage
const loadSavedPostsFromStorage = (): SavedPost[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(SAVES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Save to localStorage
const saveSavedPostsToStorage = (posts: SavedPost[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SAVES_STORAGE_KEY, JSON.stringify(posts));
  } catch {
    console.error('Failed to save posts to localStorage');
  }
};

const savedPostsFromStorage = loadSavedPostsFromStorage();

const initialState: SavesState = {
  savedPosts: savedPostsFromStorage,
  savedPostIds: savedPostsFromStorage.map((post) => post.id),
};

const savesSlice = createSlice({
  name: 'saves',
  initialState,
  reducers: {
    setSavedPosts: (state, action: PayloadAction<SavedPost[]>) => {
      state.savedPosts = action.payload;
      state.savedPostIds = action.payload.map((post) => post.id);
      saveSavedPostsToStorage(action.payload);
    },
    addSavedPost: (state, action: PayloadAction<SavedPost>) => {
      if (!state.savedPostIds.includes(action.payload.id)) {
        state.savedPosts.push(action.payload);
        state.savedPostIds.push(action.payload.id);
        saveSavedPostsToStorage(state.savedPosts);
      }
    },
    removeSavedPost: (state, action: PayloadAction<number>) => {
      state.savedPosts = state.savedPosts.filter(
        (post) => post.id !== action.payload
      );
      state.savedPostIds = state.savedPostIds.filter(
        (id) => id !== action.payload
      );
      saveSavedPostsToStorage(state.savedPosts);
    },
  },
});

export const { setSavedPosts, addSavedPost, removeSavedPost } =
  savesSlice.actions;
export default savesSlice.reducer;