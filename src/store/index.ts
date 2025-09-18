import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, Context } from 'next-redux-wrapper';
import { rootApi } from '../services/common/rootApi';

export const makeStore = (ctx?: Context) =>
  configureStore({
    reducer: {
      [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: ctx,
        },
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(rootApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Create wrapper for Next.js
export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});