import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Label } from '@y-celestial/pollux-service';

// define the type of state
export type QuestionState = {
  labels?: Label[];
};

// define the initial value of state
const initialState: QuestionState = {
  labels: undefined,
};

// define the actions in "reducers"
export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    saveLabels: (state: QuestionState, action: PayloadAction<Label[]>) => {
      state.labels = action.payload;
    },
    addLabel: (state: QuestionState, action: PayloadAction<Label>) => {
      state.labels = [...(state.labels ?? []), action.payload];
    },
  },
});

// action creators are generated for each case reducer function
export const { saveLabels, addLabel } = questionSlice.actions;

export default questionSlice.reducer;
