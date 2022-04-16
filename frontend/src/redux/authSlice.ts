import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// define the type of state
export type AuthState = {
  token?: string;
};

// define the initial value of state
const initialState: AuthState = {
  token: undefined,
};

// define the actions in "reducers"
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// action creators are generated for each case reducer function
export const { saveToken } = authSlice.actions;

export default authSlice.reducer;
