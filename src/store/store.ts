// store.ts
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import profileReducer from './slices/profileSlice';
import customerReducer from './slices/customerSlice';
import projectReducer from './slices/projectSlice';
import customerDataReducer from './slices/editCustomerSlice';


export const store = configureStore({
  reducer: {
    data: dataReducer,
    profile: profileReducer,
    customers: customerReducer,
    projects: projectReducer,
    customerData: customerDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
