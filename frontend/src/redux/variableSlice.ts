import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// define the type of state
export type VariableState = {
  userPoolId?: string;
  userPoolClientId?: string;
};

// define the initial value of state
const initialState: VariableState = {
  userPoolId: undefined,
  userPoolClientId: undefined,
};

// define the actions in "reducers"
export const variableSlice = createSlice({
  name: 'variable',
  initialState,
  reducers: {
    setVariable: (state: VariableState, action: PayloadAction<VariableState>) => {
      state.userPoolId = action.payload.userPoolId;
      state.userPoolClientId = action.payload.userPoolClientId;
    },
  },
});

// action creators are generated for each case reducer function
export const { setVariable } = variableSlice.actions;

export default variableSlice.reducer;
