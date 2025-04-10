import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './viewmodels/weatherSlice.ts';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
