import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
  isLogin: boolean;
  workload: number;
};

const initialState: UiState = {
  isLogin: false,
  workload: 0,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLogin: (state: UiState, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    startWaiting: (state: UiState) => {
      state.workload = state.workload + 1;
    },
    finishWaiting: (state: UiState) => {
      state.workload = state.workload - 1;
    },
  },
});

export const { setIsLogin, startWaiting, finishWaiting } = uiSlice.actions;

export default uiSlice.reducer;
