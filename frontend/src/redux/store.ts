import { configureStore, PayloadAction, Store } from '@reduxjs/toolkit';
import uiReducer, { UiState } from './uiSlice';

export type RootState = {
  ui: UiState;
};

let store: Store<RootState>;

export const configStore = () => {
  store = configureStore({
    reducer: {
      ui: uiReducer,
    },
  });

  return store;
};

export const getState = () => store.getState();

export const dispatch = <T>(action: PayloadAction<T>) => store.dispatch(action);
