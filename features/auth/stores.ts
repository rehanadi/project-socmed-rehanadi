import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './types';

const loadAuthFromStorage = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      token: null,
      user: null,
      isAuthenticated: false,
    };
  }

  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      return {
        token,
        user: JSON.parse(userStr),
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error('Failed to load auth from localStorage:', error);
  }

  return {
    token: null,
    user: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = loadAuthFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('savedPosts');
      }
    },
    restoreAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
          state.token = token;
          state.user = JSON.parse(userStr);
          state.isAuthenticated = true;
        }
      }
    },
  },
});

export const { setCredentials, setUser, logout, restoreAuth } =
  authSlice.actions;
export default authSlice.reducer;