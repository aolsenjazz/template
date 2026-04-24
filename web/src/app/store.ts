import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { api } from '@/features/api/api';

import { listenerMiddleware } from './listener-middleware';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  preloadedState: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(listenerMiddleware.middleware)
      .concat(api.middleware),
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
