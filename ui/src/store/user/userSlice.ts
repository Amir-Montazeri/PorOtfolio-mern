import { createSlice } from '@reduxjs/toolkit';
import { removeItem } from 'clientBrowser/localStorage';

import { UserSliceType } from 'typings/localTypes';
import {
  registerUser,
  loginUserWithEmailAndPassword,
  loginUserWithAccessToken,
} from './action';

const initialState = {
  user: null,
  error: {
    register: null,
    login: null,
  },
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      removeItem('access');
      state.user = initialState.user;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state: UserSliceType, { payload }) => {
        state.isLoading = false;
        state.error.register = payload.error.register;
        state.user = payload.user;
      }
    );
    builder.addCase(loginUserWithEmailAndPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      loginUserWithEmailAndPassword.fulfilled,
      (state: UserSliceType, { payload }) => {
        state.isLoading = false;
        state.error.login = payload.error.login;
        state.user = payload.user;
      }
    );
    builder.addCase(
      loginUserWithAccessToken.fulfilled,
      (state: UserSliceType, { payload }) => {
        state.user = payload.user;
      }
    );
  },
});

export const { logOut } = userSlice.actions;

export default userSlice;
