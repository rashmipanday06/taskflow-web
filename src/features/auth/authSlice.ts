import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {  AuthState, User } from './authTypes';

const initialState: AuthState = {
 user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
    reducers: {
        setCredentials: (state, action:PayloadAction<{ user: User; token: string }>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        clearAuthError: (state) => {
            state.error = null;
        },
  },
});
export const { setCredentials, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;