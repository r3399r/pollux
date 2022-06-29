import { configureStore, PayloadAction, Store } from '@reduxjs/toolkit';
import questionReducer, { QuestionState } from './qustionSlice';
import uiReducer, { UiState } from './uiSlice';
import variableSlice, { VariableState } from './variableSlice';

export type RootState = {
  ui: UiState;
  question: QuestionState;
  variable: VariableState;
};

let store: Store<RootState>;

export const configStore = () => {
  store = configureStore({
    reducer: {
      ui: uiReducer,
      question: questionReducer,
      variable: variableSlice,
    },
  });

  return store;
};

export const getState = () => store.getState();

export const dispatch = <T>(action: PayloadAction<T>) => store.dispatch(action);
