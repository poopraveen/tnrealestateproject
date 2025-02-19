// store.ts
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import profileReducer from './slices/profileSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
