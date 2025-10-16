import counterReducer from '@/features/counter/counter-slice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { listenerMiddleware } from './listener-middleware';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  preloadedState: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
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
