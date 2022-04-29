import { configureStore, PayloadAction, Store } from '@reduxjs/toolkit';
import questionReducer, { QuestionState } from './qustionSlice';
import uiReducer, { UiState } from './uiSlice';

export type RootState = {
  ui: UiState;
  question: QuestionState;
};

let store: Store<RootState>;

export const configStore = () => {
  store = configureStore({
    reducer: {
      ui: uiReducer,
      question: questionReducer,
    },
  });

  return store;
};

export const getState = () => store.getState();

export const dispatch = <T>(action: PayloadAction<T>) => store.dispatch(action);
