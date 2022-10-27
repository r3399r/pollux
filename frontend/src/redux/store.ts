import { configureStore, PayloadAction, Store } from '@reduxjs/toolkit';
import questionReducer, { QuestionState } from './questionSlice';
import tagReducer, { TagState } from './tagSlice';
import uiReducer, { UiState } from './uiSlice';
import variableReducer, { VariableState } from './variableSlice';

export type RootState = {
  question: QuestionState;
  tag: TagState;
  ui: UiState;
  variable: VariableState;
};

let store: Store<RootState>;

export const configStore = () => {
  store = configureStore({
    reducer: {
      question: questionReducer,
      tag: tagReducer,
      ui: uiReducer,
      variable: variableReducer,
    },
  });

  return store;
};

export const getState = () => store.getState();

export const dispatch = <T>(action: PayloadAction<T>) => store.dispatch(action);
