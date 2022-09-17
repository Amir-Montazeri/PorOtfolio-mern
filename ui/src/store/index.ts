import { configureStore } from '@reduxjs/toolkit';
import user from './user/userSlice';

const store = configureStore({
  reducer: {
    globalLoading: globalLoadingSlice.reducer,
    user: user.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// app/hooks.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import globalLoadingSlice from './global-loading/globalLoadingSlice';
// import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
