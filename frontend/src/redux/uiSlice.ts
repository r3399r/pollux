import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// define the type of state
export type UiState = {
  isLogin: boolean;
  snackbarOpen: boolean;
  snackbarSeverity: AlertColor;
  snackbarMessage?: string;
  isLoading: boolean;
};

// define the initial value of state
const initialState: UiState = {
  isLogin: false,
  snackbarOpen: false,
  snackbarSeverity: 'success',
  snackbarMessage: undefined,
  isLoading: false,
};

// define the actions in "reducers"
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLogin: (state: UiState, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    openSnackbar: (
      state: UiState,
      action: PayloadAction<{ severity: AlertColor; message: string }>,
    ) => {
      state.snackbarOpen = true;
      state.snackbarSeverity = action.payload.severity;
      state.snackbarMessage = action.payload.message;
    },
    closeSnackbar: (state: UiState) => {
      state.snackbarOpen = false;
    },
    showLoading: (state: UiState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// action creators are generated for each case reducer function
export const { setIsLogin, openSnackbar, closeSnackbar, showLoading } = uiSlice.actions;

export default uiSlice.reducer;
