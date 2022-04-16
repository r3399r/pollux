import { combineReducers, configureStore, PayloadAction, Store } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'; // defaults to localStorage for web
import authReducer, { AuthState } from './authSlice';
import uiReducer, { UiState } from './uiSlice';

export type RootState = {
  ui: UiState;
  auth: AuthState;
};

let store: Store<RootState>;

const reducers = combineReducers({ ui: uiReducer, auth: authReducer });

// reducer in whitelist would be persisted
const whitelist: string[] = ['auth'];

export const configStore = () => {
  store = configureStore({
    reducer: persistReducer(
      {
        key: 'root',
        storage,
        whitelist,
      },
      reducers,
    ),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          /* ignore persistance actions */
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

export const getState = () => store.getState();

export const dispatch = <T>(action: PayloadAction<T>) => store.dispatch(action);
