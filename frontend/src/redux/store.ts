import { configureStore, PayloadAction, Store } from '@reduxjs/toolkit';
import uiReducer, { UiState } from './uiSlice';
import variableReducer, { VariableState } from './variableSlice';

export type RootState = {
  ui: UiState;
  variable: VariableState;
};

let store: Store<RootState>;

export const configStore = () => {
  store = configureStore({
    reducer: {
      ui: uiReducer,
      variable: variableReducer,
    },
  });

  return store;
};

export const getState = () => store.getState();

export const dispatch = <T>(action: PayloadAction<T>) => store.dispatch(action);
