
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 

export const store = configureStore({
  reducer: {
    user: userReducer 
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

// Export the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
