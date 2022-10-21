import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
  isLogin: boolean;
  workload: number;
  showSnackbar: boolean;
  snackbarMessage: string | null;
};

const initialState: UiState = {
  isLogin: false,
  workload: 0,
  showSnackbar: false,
  snackbarMessage: null,
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
    openSnackbar: (state: UiState, action: PayloadAction<string>) => {
      state.showSnackbar = true;
      state.snackbarMessage = action.payload;
    },
    closeSnackbar: (state: UiState) => {
      state.showSnackbar = false;
    },
  },
});

export const { setIsLogin, startWaiting, finishWaiting, openSnackbar, closeSnackbar } =
  uiSlice.actions;

export default uiSlice.reducer;
