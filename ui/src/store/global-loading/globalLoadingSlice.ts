import { createSlice } from '@reduxjs/toolkit';

interface globalLoadingSliceType {
  loading: boolean;
  status: string | undefined;
}

const initialState = {
  loading: false,
  status: undefined,
};

const globalLoadingSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGlobalLoading: (state: globalLoadingSliceType, action) => {
      state.loading = action.payload.loading;
      state.status = action.payload.status;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice;
