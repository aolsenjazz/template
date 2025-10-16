import { vaultApi } from '@/features/api/vault-api';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { listenerMiddleware } from './listener-middleware';

export const store = configureStore({
  reducer: {
    [vaultApi.reducerPath]: vaultApi.reducer,
  },
  preloadedState: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(listenerMiddleware.middleware)
      .concat(vaultApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
