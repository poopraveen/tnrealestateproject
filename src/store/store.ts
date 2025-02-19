import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import profileReducer from './slices/profileSlice';
import { uploadImage } from './slices/profileSlice';
export const store = configureStore({
  reducer: {
    data: dataReducer,
    profile: profileReducer
  },
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(uploadImage.middleware),
},
}
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
